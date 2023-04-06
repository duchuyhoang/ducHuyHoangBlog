/* eslint-disable @typescript-eslint/no-base-to-string */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '../../Auth'
import { useFirebaseContext } from '../../FirebaseWrapper'
import {
  Comment,
  CommentWithDocId,
  IAddComment
} from '../../../../services/model/Comment'
import {
  AUTH_STATUS,
  COLLECTION_NAMES,
  FIREBASE_LOADING_STATUS
} from '../../../../common/enum'
import { where } from 'firebase/firestore/lite'
import { wrapperAsync } from '../../../../common/utils'
import { Repository } from '../../../../services/Repository'
import { User } from '../../../../services/model/User'
import CommentItem from './CommentItem'
import Loading from '../../Loading'
import { RiSendPlaneFill } from 'react-icons/ri'
import moment from 'moment'
import NoComment from './NoComment'

interface IComment {
  slug: string
}

const ITEMS_PER_PAGE = 10

const Comments = ({ slug, ...rest }: IComment) => {
  const { authStatus, user, setIsOpenLoginModal } = useAuth()
  const [cmtValue, setCmtValue] = useState('')
  const { dataSource, status } = useFirebaseContext()
  const textAreaRef = useRef<any>(null)
  const [listComment, setListComment] = useState<CommentWithDocId[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [page, setPage] = useState(1)

  const isDisabledSendButton = useMemo(() => {
    return cmtValue.trim().length === 0 || isLoading || isSending
  }, [cmtValue, isLoading, isSending])

  const listSortedComment = useMemo(() => {
    return listComment.sort((a, b) => {
      if (b?.user?.uid === user?.uid && a.user.uid !== user?.uid) return 1

      if (a?.user?.uid === user?.uid && b.user.uid !== user?.uid) return -1

      if (a?.user?.uid === user?.uid && b.user.uid === user?.uid) {
        return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      }

      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
    })
  }, [listComment, user])

  useEffect(() => {
    const handleGetAllCommentByPost = async () => {
      const commentRepository: Repository<Comment> | undefined =
        dataSource.getRepository(COLLECTION_NAMES.COMMENT)
      const userRepository: Repository<User> | undefined =
        dataSource.getRepository(COLLECTION_NAMES.USER)

      if (
        commentRepository &&
        userRepository &&
        status === FIREBASE_LOADING_STATUS.SUCCEED
      ) {
        setIsLoading(true)
        try {
          let comments = await commentRepository.getAll(
            where('postSlug', '==', slug)
          )
          comments = await Promise.all(
            comments.map(async comment => {
              const handleGetUser = async () => {
                return await userRepository.getDataByReference(
                  comment.user as any
                )
              }
              const [data] = await wrapperAsync(handleGetUser())
              return { ...comment, user: data }
            })
          )

          setListComment(comments.filter(com => !!com.user))
        } catch (e) {
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
    handleGetAllCommentByPost()
  }, [dataSource, slug, status])

  const isShowLoadMore = useMemo(() => {
    return page * ITEMS_PER_PAGE < listSortedComment.length
  }, [page, listSortedComment])

  const addComment = useCallback(async () => {
    const commentRepository: Repository<IAddComment> | undefined =
      dataSource.getRepository(COLLECTION_NAMES.COMMENT)
    const userRepository: Repository<User> | undefined =
      dataSource.getRepository(COLLECTION_NAMES.USER)
    if (commentRepository && userRepository && user) {
      setIsSending(true)
      try {
        const userReference = await userRepository.getReference(user.docId)
        const payload: Comment = {
          content: cmtValue.trim(),
          postSlug: slug,
          createAt: moment.utc(new Date()).toString(),
          user
        }
        const newComment = await commentRepository.addOne({
          ...payload,
          user: userReference
        })

        setListComment(prev => {
          const datas = [...prev]
          datas.unshift({
            ...payload,
            docId: newComment.id
          })
          return datas
        })
        setCmtValue('')
      } catch (e) {
        console.log('add comment error', e)
      } finally {
        setIsSending(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dataSource, cmtValue, setListComment])

  return (
    <div id="comment" className="mb-3" {...rest}>
      <h2>{listSortedComment?.length ?? 0} comment</h2>
      <div className="text-area-wrapper">
        <textarea
          className="text-send-area"
          disabled={isSending || isLoading}
          placeholder="Type your comment here..."
          ref={textAreaRef}
          onChange={e => {
            setCmtValue(e.target.value)
            textAreaRef.current.style.height = 'auto'
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
          }}
          value={cmtValue}
        ></textarea>
      </div>
      <div className="submit-btn-wrapper">
        {authStatus === AUTH_STATUS.SUCCEED && !!user ? (
          <button
            className={`btn send-comment-btn ${
              isDisabledSendButton ? 'disabled' : ''
            }`}
            onClick={addComment}
          >
            Send
            {isSending ? (
              <Loading
                iconProps={{
                  width: 10,
                  height: 10
                }}
              />
            ) : (
              <RiSendPlaneFill />
            )}
          </button>
        ) : (
          <button
            className={`btn login-btn ${
              authStatus === AUTH_STATUS.LOADING ? 'disabled' : ''
            }`}
            onClick={() => {
              setIsOpenLoginModal(true)
            }}
          >
            {authStatus === AUTH_STATUS.LOADING ? (
              <>
                <Loading />
              </>
            ) : (
              'Login'
            )}
          </button>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-3">
          {listSortedComment.length !== 0 ? (
            listSortedComment
              .slice(0, page * ITEMS_PER_PAGE)
              .map(comment => (
                <CommentItem comment={comment} key={comment.docId} />
              ))
          ) : (
            <div className="mt-4">
              <NoComment />
            </div>
          )}
        </div>
      )}
      {isShowLoadMore && (
        <div className="mt-3 text-center">
          <button
            className="btn load-more-btn"
            onClick={() => {
              setPage(prev => ++prev)
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}

export default Comments
