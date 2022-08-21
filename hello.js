const command = [
	{
	  code: "ACB",
	  quantity: 100,
	  price: 40,
	  order_type: "Buy",
	},
	{
	  code: "ACB",
	  quantity: 123,
	  price: 45,
	  order_type: "Buy",
	},
	{
	  code: "ACB",
	  quantity: 50,
	  price: 12,
	  order_type: "Buy",
	},
	{
	  code: "FCB",
	  quantity: 123,
	  price: 40,
	  order_type: "Buy",
	},
  ];
  
  let indexSet=new Set();
  for (let i = 0; i < command.length ; i++) {
	for (let j = 0; j < command.length; j++) {
	  if ((command[i].code === command[j].code) && (command[i].order_type === command[j].order_type)&&i!==j) {
		indexSet.add(i);
	  }
	}
  }
  indexSet.forEach((index)=>{
	console.log(command[index]);
  })