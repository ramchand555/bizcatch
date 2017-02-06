/// Database Table creation script /////

function PopulateDatabase(tx)
{
tx.executeSql("Create Table IF NOT EXISTS products(p_id INTEGER PRIMARY KEY AUTOINCREMENT,code integer,desc text,unit text,price REAL,status Numeric)");
tx.executeSql("Create Table IF NOT EXISTS unit(p_id INTEGER PRIMARY KEY AUTOINCREMENT,unit text,description text,status Numeric)");
tx.executeSql("Create Table IF NOT EXISTS customer_supplier(p_id INTEGER PRIMARY KEY AUTOINCREMENT,name text,address text,mobile_no text,email_id text,status Numeric)");
//tx.executeSql("Insert into product values(1,'P1','Produt1',2,12.5)");
tx.executeSql("Create Table IF NOT EXISTS retail_sale(id INTEGER PRIMARY KEY AUTOINCREMENT,bill_no INTEGER,date DATETIME DEFAULT CURRENT_TIMESTAMP ,status text)");
tx.executeSql("Create Table IF NOT EXISTS retail_sale_detail(id INTEGER PRIMARY KEY AUTOINCREMENT,retail_sale_id INTEGER,product_id INTEGER ,quantity INTEGER ,price text ,status text ,FOREIGN KEY(retail_sale_id) REFERENCES retail_sale(id))");

//tx.executeSql("Insert into product values(2,'P2','Produt2',4,'12.5')");
}

function errorDB(error)
{
alert("Error on Database Creation: "+ error.message);
}

function successDB(error)	
{
//alert("Databse created succ");
}

/// Database Table creation script ends/////

function edit(form,id)
{
	
	console.log("#####"+form+"#####"+id);
 	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM products where p_id=?', [id], function(tx, result) {
    $.each(result.rows,function(index){
    var row = result.rows.item(index);
	document.getElementById("p_id").value=row['p_id'];
	document.getElementById("code").value=row['code'];
	document.getElementById("desc").value=row['desc'];
	document.getElementById("unit").value=row['unit'];
	document.getElementById("price").value=row['price'];
	console.log(row);
	$.mobile.navigate( "#addproduct" );

	});
	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
	}); 
}

function unit_edit(form,id)
{
	
	console.log("#####"+form+"#####"+id);
 	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM unit where p_id=?', [id], function(tx, result) {
    $.each(result.rows,function(index){
    var row = result.rows.item(index);
	document.getElementById("p_unit_id").value=row['p_id'];
	document.getElementById("unitadd").value=row['unit'];
	document.getElementById("description").value=row['description'];
	console.log(row);
	$.mobile.navigate( "#addunits" );
	});
	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
	}); 
}

function cust_edit(form,id)
{
	console.log("#####"+form+"#####"+id);
 	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM customer_supplier where p_id=?', [id], function(tx, result) {
    $.each(result.rows,function(index){
    var row = result.rows.item(index);
	document.getElementById("p_cust_id").value=row['p_id'];
	document.getElementById("cust_name").value=row['name'];
	document.getElementById("address").value=row['address'];
	document.getElementById("mobile").value=row['mobile_no'];
	document.getElementById("email").value=row['email_id'];
	console.log(row);
	$.mobile.navigate( "#addcustomer" );
	});
	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
	}); 
}

function supp_edit(form,id)
{
	console.log("#####"+form+"#####"+id);
 	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM customer_supplier where p_id=?', [id], function(tx, result) {
    $.each(result.rows,function(index){
    var row = result.rows.item(index);
	document.getElementById("p_supp_id").value=row['p_id'];
	document.getElementById("supp_name").value=row['name'];
	document.getElementById("s_address").value=row['address'];
	document.getElementById("s_mobile").value=row['mobile_no'];
	document.getElementById("s_email").value=row['email_id'];
	console.log(row);
	$.mobile.navigate( "#addsupplier" );
	});
	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
	}); 
}


function delete_prod(p_id)
{
	database.transaction(function(tx) {	
		if(p_id === undefined ||  p_id === null ||  p_id === '')
			console.log('Nothing to delete'+p_id );
		else
			console.log('prodcut Id deleted'+p_id );
			tx.executeSql('delete from products where p_id=?', [p_id]);
	}, function(error) {
    console.log('Prodcut Id Transaction ERROR: ' + error.message);
  });
}

function Prod_add_data(obj)
{

database.transaction(function(tx) {
	if(obj.p_id === undefined ||  obj.p_id === null ||  obj.p_id === '')
    tx.executeSql('INSERT INTO products(code,desc,unit,price) VALUES (?,?,?,?)', [obj.code,obj.desc,obj.unit,obj.price]);
	else
    tx.executeSql('update products set code=?, desc=?, unit=?, price=? where p_id=?', [obj.code,obj.desc,obj.unit,obj.price,obj.p_id]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
  }, function() {
	  $(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');
				setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
	 $('#add_prod_form').trigger("reset");
	 $('form#add_prod_form input[type=hidden]').val('');
	 if(obj.p_id !== undefined &&  obj.p_id !== null &&  obj.p_id !== '')
	 $.mobile.navigate( "#product" );

  }); 
}

function unit_add_data(obj)
{
console.log(obj); 

database.transaction(function(tx) {
	if(obj.p_unit_id === undefined ||  obj.p_unit_id === null ||  obj.p_unit_id === '')
    tx.executeSql('INSERT INTO unit(description,unit) VALUES (?,?)', [obj.description,obj.unitadd]);
	else
    tx.executeSql('update unit set  description=?, unit=? where p_id=?', [obj.description,obj.unitadd,obj.p_unit_id]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
  }, function() {
	  $(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');
				setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
	 $('#add_unit_form').trigger("reset");
	 $('form#add_unit_form input[type=hidden]').val('');
	 if(obj.p_unit_id !== undefined &&  obj.p_unit_id !== null &&  obj.p_unit_id !== '')
	 $.mobile.navigate( "#frmunits" );

  }); 
}

function cust_add_data(obj)
{
console.log(obj); 

database.transaction(function(tx) {
	if(obj.p_cust_id === undefined ||  obj.p_cust_id === null ||  obj.p_cust_id === '')
    tx.executeSql('INSERT INTO customer_supplier(name,address,mobile_no,email_id,status) VALUES (?,?,?,?,1)', [obj.cust_name,obj.address,obj.mobile,obj.email]);
	else
		console.log('Transaction update ');
    tx.executeSql('update customer_supplier set name=?, address=?, mobile_no=?, email_id=? where p_id=?', [obj.cust_name,obj.address,obj.mobile,obj.email,obj.p_cust_id]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
  }, function() {
	  $(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');
				setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
	 $('#add_cust_form').trigger("reset");
	 $('form#add_cust_form input[type=hidden]').val('');
	 if(obj.p_cust_id !== undefined &&  obj.p_cust_id !== null &&  obj.p_cust_id !== '')
	 $.mobile.navigate( "#customer" );

  }); 
}

function supp_add_data(obj)
{
console.log(obj); 

database.transaction(function(tx) {
	if(obj.p_supp_id === undefined ||  obj.p_supp_id === null ||  obj.p_supp_id === '')
    tx.executeSql('INSERT INTO customer_supplier(name,address,mobile_no,email_id,status) VALUES (?,?,?,?,2)', [obj.supp_name,obj.s_address,obj.s_mobile,obj.s_email]);
	else
		console.log('Transaction update ');
    tx.executeSql('update customer_supplier set name=?, address=?, mobile_no=?, email_id=? where p_id=?', [obj.supp_name,obj.s_address,obj.s_mobile,obj.s_email,obj.p_supp_id]);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
  }, function() {
	  $(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');
				setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
	 $('#add_supp_form').trigger("reset");
	 $('form#add_supp_form input[type=hidden]').val('');
	 if(obj.p_supp_id !== undefined &&  obj.p_supp_id !== null &&  obj.p_supp_id !== '')
	 $.mobile.navigate( "#supplier" );

  }); 
}

function sales_add_data(obj_arry)
{
	
		function printDate() {
		var temp = new Date();
		var dateStr = padStr(temp.getFullYear()) +
					  padStr(1 + temp.getMonth()) +
					  padStr(temp.getDate()) +
					  padStr(temp.getHours()) +
					  padStr(temp.getMinutes()) +
					  padStr(temp.getSeconds());
					  return dateStr;
		}

		function padStr(i) {
		return (i < 10) ? "0" + i : "" + i;
		}
		var datetime=printDate();
	database.transaction(function(tx) {
		
    tx.executeSql('INSERT INTO retail_sale(date,status) VALUES ("'+datetime+'","Active")', [], function(tx, result) {
		
		    var last_record=obj_arry[obj_arry.length -1].p_id;
			//database.transaction(function(tx) {
			for (var i=0; i < obj_arry.length; i++) {
				var temp=obj_arry[i];
				console.log(temp);	
				var lastid=result.insertId;
		    var transaction = function(lastid){
				tx.executeSql('INSERT INTO retail_sale_detail(retail_sale_id,product_id,quantity,price,status) VALUES (?,?,?,?,?)', [lastid,temp.p_id,temp.qty,temp.price,1], function(tx, result) {
				console.log("suc inside");
				
				var obj_len=obj_arry.length -1;
				console.log(i,obj_len);
				if(temp.p_id == last_record)
				{
				 $("div#divLoading").removeClass('show');				 
				$(".status_msg").fadeIn().html('<span id="success_message" class="success"><b>Data saved successfully</b></span>');				 
					setTimeout(function() {
					$('.status_msg').fadeOut("slow");
				}, 2000 );
				 $('#add_sales_form')[0].reset();
				 $('#tbProp').html('');
				 $('#total').val(0);	
				}
				
			}, function(tx, error) {
			  console.log('SELECT error: ' + error.message);
			  	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');

			   $("div#divLoading").removeClass('show');
			});
			}(lastid) 
			}
			//});

		

	}, function(tx, error) {
      console.log('SELECT error: ' + error.message);
  	$("#status_msg").html('<span id="error_message" class="error">Transaction ERROR:<b>' + error.message+'</b></span>');
	  $("div#divLoading").removeClass('show');
    });
	});

}

function Prod_select(source)
{
	//console.log("kkk");
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM products', [], function(tx, result) {
	//	$('ul#prod_list_view').empty();
		if(source == "sales")
		{
			product_list = new Array();
			console.log("sales-inside");
			console.log(result.rows);
			 $.each(result.rows,function(index){
				 product_list.push(result.rows.item(index));
			 });
			 $("div#divLoading").removeClass('show');
			//product_list=result.rows;
			//console.log(product_list[0]['code']);
			return false;	
		}
		$('ul#prod_list_view').html('<li data-role="list-divider">Product</li>');
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('ul#prod_list_view').append('<li><a href="#" id="'+row['p_id']+'" onclick="edit(\'product\','+row['p_id']+');"><h3 class="ui-li-heading">'+row['desc']+'</h3><p class="ui-li-desc">Code: '+row['code']+'      '+'Unit: '+row['unit']+'      '+'Price: '+row['price']+'</p></a></li>');
        });
 
        $('ul#prod_list_view').listview('refresh');
    }, function(tx, error) {
      $("div#divLoading").removeClass('show');
      console.log('SELECT error: ' + error.message);
    });
  });
}				


function unit_select()
{
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM unit', [], function(tx, result) {
		$('ul#unit_list_view').html('<li data-role="list-divider">Units</li>');
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('ul#unit_list_view').append('<li><a href="#" id="'+row['p_id']+'" onclick="unit_edit(\'frmunits\','+row['p_id']+');"><h3 class="ui-li-heading">'+row['description']+'</h3><p class="ui-li-unit">unit: '+row['unit']+'</p></a></li>');
        });
 
        $('ul#unit_list_view').listview('refresh');
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
}	

function cust_select()
{
//	console.log("kkk");
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM customer_supplier where status = 1', [], function(tx, result) {
		$('ul#cust_list_view').html('<li data-role="list-divider">Customer</li>');
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('ul#cust_list_view').append('<li><a href="#" id="'+row['p_id']+'" onclick="cust_edit(\'customer\','+row['p_id']+');"><h3 class="ui-li-heading">'+row['name']+'</h3><p class="ui-li-desc">Address: '+row['address']+'      '+'Mobile No: '+row['mobile_no']+'      '+'Email Id: '+row['email_id']+'</p></a></li>');
        });
 
        $('ul#cust_list_view').listview('refresh');
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
}				

function supp_select()
{
//	console.log("kkk");
	database.transaction(function(tx) {
    tx.executeSql('SELECT * FROM customer_supplier where status = 2', [], function(tx, result) {
		$('ul#supp_list_view').html('<li data-role="list-divider">Supplier</li>');
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('ul#supp_list_view').append('<li><a href="#" id="'+row['p_id']+'" onclick="supp_edit(\'supplier\','+row['p_id']+');"><h3 class="ui-li-heading">'+row['name']+'</h3><p class="ui-li-desc">Address: '+row['address']+'      '+'Mobile No: '+row['mobile_no']+'      '+'Email Id: '+row['email_id']+'</p></a></li>');
        });
 
        $('ul#supp_list_view').listview('refresh');
    }, function(tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  });
}	