var database=null;
var bluetooth_prnt_var=null;
var product_list=[];
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery); 


function redirect(page)
{
switch(page)
{
	case "product":
	$.mobile.navigate( "#product" );
	break;
	case "frmunits":
	$.mobile.navigate( "#frmunits" );
	break;
	case "customer":
	$.mobile.navigate( "#customer" );
	break;
	case "supplier":
	$.mobile.navigate( "#supplier" );
	break;
	case "settings":
	$.mobile.navigate( "#settings" );
	break;
}	
}

function save_prod(obj)
{	
	Prod_add_data(obj); 
}	

function save_unit(obj)
{
	console.log(obj);
	unit_add_data(obj); 
}	

function save_cust(obj)
{
	console.log(obj);
	cust_add_data(obj); 
}	
function save_supp(obj)
{
	console.log(obj);
	supp_add_data(obj); 
}	
function save_store(obj)
{
	console.log(obj);
	store_add_data(obj); 
}	
function save_sales(obj_ary)
{
	sales_add_data(obj_ary); 
}

$( document ).ready(function() {
document.addEventListener("deviceready",onDeviceReady,false);

$("#add_prod_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);
		save_prod($this.serializeFormJSON());
        return false;	
	}	  
});

$("#add_unit_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);		
		save_unit($this.serializeFormJSON());
        return false;	
	}	  
});

$("#add_cust_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);		
		save_cust($this.serializeFormJSON());
        return false;	
	}	  
});

$("#add_supp_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);		
		save_supp($this.serializeFormJSON());
        return false;	
	}	  
});

$("#add_store_form").validate({
		errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
	submitHandler: function (form) {
		var $this = $(form);		
		save_store($this.serializeFormJSON());
        return false;	
	}	  
});


$("#add_sales_form").validate({
		errorPlacement: function (error, element) {
       
    },
	submitHandler: function (form) {
		$("div#divLoading").addClass('show');
		var $this = $(form);		
		//save_cust($this.serializeFormJSON());

		MyRows=$('table#tableProp').find('tbody').find('tr');
		var sales_array= new Array();
for (var i = 0; i < MyRows.length; i++) {
		var sales_obj={};
		sales_obj.code=$(MyRows[i]).find('td:eq(0)').html();
		sales_obj.p_id=$(MyRows[i]).find('td:eq(1)').html();
		sales_obj.qty=$(MyRows[i]).find('td:eq(3)').html();
		sales_obj.price=$(MyRows[i]).find('td:eq(4)').html();
		sales_array.push(sales_obj);		
}
		save_sales(sales_array);

        return false;	
	}	  
});
$("#sales").on("pageshow" , function() {

	
});

$("#product").on("pageshow" , function() {
  Prod_select();
    $( "#product" ).on( "swipeleft", "#prod_list_view li a", function( event ) {
        var listitem = $( this ),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
			
			//console.log(this.id);
            confirmAndDelete( listitem, transition ,this.id );
    });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#prod_list_view" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
            var listitem = $( this ).parent( "li" );
            confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ,p_id ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
			listitem.remove();
			//listitem.removeClass( "ui-btn-active" );
			$( "#confirm #yes" ).off();
			delete_prod(p_id);		
			listitem.refresh();
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
  
});

$("#frmunits").on("pageshow" , function() {
  unit_select();
    $( "#frmunits" ).on( "swipeleft", "#unit_list_view li a", function( event ) {
        var listitem = $( this ),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
			
			//console.log(this.id);
            confirmAndDelete( listitem, transition ,this.id );
    });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#unit_list_view" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
            var listitem = $( this ).parent( "li" );
            confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ,p_id ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
			listitem.remove();
			//listitem.removeClass( "ui-btn-active" );
			$( "#confirm #yes" ).off();
			delete_unit(p_id);		
			listitem.refresh();
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
});

$("#customer").on("pageshow" , function() {
  cust_select();
    $( "#customer" ).on( "swipeleft", "#prod_list_view li a", function( event ) {
        var listitem = $( this ),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
			//console.log(this.id);
            confirmAndDelete( listitem, transition ,this.id );
    });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#prod_list_view" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
            var listitem = $( this ).parent( "li" );
            confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ,p_id ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
			listitem.remove();
			//listitem.removeClass( "ui-btn-active" );
			$( "#confirm #yes" ).off();
			delete_prod(p_id);		
			listitem.refresh();
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
});

$("#supplier").on("pageshow" , function() {
  supp_select();
    $( "#supplier" ).on( "swipeleft", "#prod_list_view li a", function( event ) {
        var listitem = $( this ),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
			
			//console.log(this.id);
            confirmAndDelete( listitem, transition ,this.id );
    });
    // If it's not a touch device...
    if ( ! $.mobile.support.touch ) {
        // Remove the class that is used to hide the delete button on touch devices
        $( "#prod_list_view" ).removeClass( "touch" );
        // Click delete split-button to remove list item
        $( ".delete" ).on( "click", function() {
            var listitem = $( this ).parent( "li" );
            confirmAndDelete( listitem );
        });
    }
    function confirmAndDelete( listitem, transition ,p_id ) {
        // Highlight the list item that will be removed
        listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        $( "#confirm .topic" ).remove();
        listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        $( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        $( "#confirm #yes" ).on( "click", function() {
			listitem.remove();
			//listitem.removeClass( "ui-btn-active" );
			$( "#confirm #yes" ).off();
			delete_prod(p_id);		
			listitem.refresh();
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }
});

$("#store_info").on("pageshow" , function() {
	store_select();
});


function BTlist()
{
	BTPrinter.list(function(data){
		$("#bluetooth_list").html('');
        console.log("Success");
        console.log(data); //list of printer in data array
$("#bluetooth_list").append('<legend>Bluetooth Devices</legend>');
		 for(var k=0;k < data.length;k++)
		 {
			 console.log(k);
		  $("#bluetooth_list").append('<input type="radio" name="bluetooth_list" id="bluetooth_list_'+k+'" value="'+data[k]+'" ><label for="bluetooth_list_'+k+'">'+data[k]+'</label>');
		 }
		$("#printer_list_div").trigger('create');
		
		 $("input[name='bluetooth_list']").on("change", function() {
		  var index = $('input:radio[name=bluetooth_list]').index(this);
		  window.localStorage.setItem("selected_printer_value", $("input[name='bluetooth_list']:checked").val());
		  window.localStorage.setItem("selected_printer_index", $('input:radio[name=bluetooth_list]').index(this));
		  console.log(localStorage.getItem("selected_printer_value"));
		});
		
		$('input[type="radio"][name=bluetooth_list][value="'+localStorage.getItem("selected_printer_value")+'"]').attr("checked", "checked");
		$("input[type='radio'][name=bluetooth_list]").checkboxradio("refresh");

    },function(err){
        console.log("Error");
        console.log(err);
		$("#print_error").html(err);
    })
}
$("#printer_config").on("pageshow" , function() {
  
   var btlist = BTlist();
  $("#bluetooth_list").append('<legend>Bluetooth Devices</legend>');
 
});
$(document).on('click', '#printer_refresh', function(e){
    BTlist();
});

});

function onDeviceReady() 
{
	console.log("device ready");
	database=window.openDatabase("myappdb","1.0","Application Database",200000);
	database.transaction(PopulateDatabase,errorDB,successDB); 

	console.log(window);
	console.log(navigator);
	console.log(Camera);
	if (typeof window.BTPrinter !== 'undefined') {
		console.log("inside");
		bluetooth_prnt_var = BTPrinter;			
	}
}

 $(document).on('submit', '#add_prod_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); 

$(document).on('submit', '#add_unit_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); 


$(document).on('submit', '#add_cust_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
}); 

$(document).on('submit', '#add_supp_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); 

$(document).on('submit', '#add_store_form', function (e) {
	
	
    //cache the form element for use in this function
    var $this = $(this);

    //prevent the default submission of the form
    e.preventDefault();

    //run an AJAX post request to your server-side script, $this.serialize() is the data from your form being added to the request
	
	console.log($this.serialize());
	
}); 

 
$(document).on('pagebeforeshow', '#sales', function(){
var cnt=0;
$("div#divLoading").addClass('show');
Prod_select('sales');	
/* var product_list=[];
 product_list.push({pid: 1, prod_code:"1003",prod_name: "produ2", price: 1.4});
product_list.push({pid: 2, prod_code:"1004",prod_name: "produ1", price: 6});  */
 
    $(document).on('click', '#plus', function(){
		if($("#p_code").val() == "")
		{
		$(".error").html("<b>Please enter a product code!!!!</b>"); 
		  setTimeout(function() {
		  $('.error').html('');
		}, 500);
       return false;
		}
        var tb = $('#tbProp');
        console.log(product_list);
        var obj = product_list.filter(function ( obj ) {
            return obj.code == $("#p_code").val() ;
        })[0];
        // console.log(obj);
                                                                var items=[];
        $('#tableProp tbody tr td:nth-child(1)').each( function(){
           //add item to array
           items.push( $(this).text() );      
        });
        console.log(items);
       
				 console.log(obj);
				
       if (typeof obj === 'undefined')
	   {
		$(".error").html("<b>Product not found !!!!</b>"); 
				setTimeout(function() {
		  $('.error').html('');
		}, 500);
       return false;
	   }
       if(items.indexOf(obj['code'].toString()) != -1)
	   {
		$(".error").html("<b>Product already added !!!</b>"); 
		setTimeout(function() {
		  $('.error').html('');
		}, 500);
       return false;
	   }
      
        newRow = '<tr><td style="text-align: center;vertical-align:middle">' + obj['code'] + '</td><td style="text-align: center;vertical-align:middle;display:none">' + obj['p_id'] + '</td> <td style="text-align: center;vertical-align:middle;max-width: 200px;word-wrap: break-word">' +obj['desc'] + '</td><td style="text-align: center;vertical-align:middle" class="measure" name="qty'+cnt+'" id="qty'+cnt+'" contenteditable required></td><td style="text-align: center;vertical-align:middle">'+obj['price']+'</td><td style="text-align: center;vertical-align:middle">0.00</td><td style="text-align: center;vertical-align:middle"><center><a href="#" data-role="button" id="minus" data-icon="delete" data-iconpos="notext">Delete</a></center></td></tr>',
      
        tb.append(newRow);
       
        $("#tableProp").trigger('create');
        cnt++;
    });   
});
 

$( document ).ready(function() {
function calc()
{
$('#tableProp tbody tr td:nth-child(1)').each( function(){
           //add item to array
           items.push( $(this).text() );      
 });
}

$(document).on('click', '#minus', function () {
    // alert("aa");
     $(this).closest('tr').remove();
	 if($("#tbProp").html().trim() == "")
	 $("#total").html(0);
     else
	 total_calc();
     return false;
});
function total_calc()
{
	var total_sm=0;
  $('#tableProp tbody tr td:nth-child(6)').each( function(){
           //add item to array
           total_sm=Number(total_sm)+Number(parseFloat($(this).text()).toFixed(2));
});
 
$("#total").html(total_sm);
}
$(document).on('click', '#save_sales', function (){
	if($("#tbProp").html().trim() == "")
	{
		alert("Atleast one item is required for sales submit");
	   return false;
	}
	
	$("#add_sales_form").submit();
	
});
$("#tableProp").on('blur', '.measure', function(eve){
      if( $(this).html().slice(-1) == ".")		
		$(this).html($(this).html()+'0');
  if($(this).html().indexOf('.') == 0) { 
	$(this).html('0'+$(this).html());
  }
}); 

$("#tableProp").on('keyup focusout', '.measure', function(eve){

	

  var qty=$(this).html();
 if(qty == "")
 {
	qty = 0; 
 }
console.log($(this).closest('td').next('td').html());
$(this).closest('td').next('td').closest('td').next('td').html( parseFloat(parseFloat(qty).toFixed(2) *  parseFloat($(this).closest('td').next('td').html()).toFixed(2)).toFixed(2));
total_calc();
});
$("#tableProp").on('cut copy paste', '.measure', function(e){
          e.preventDefault();
 });


});
$(document).on('keypress paste', '.measure', function(eve){
  if ((eve.which != 46 || $(this).html().indexOf('.') != -1) && (eve.which < 48 || eve.which > 57) || (eve.which == 46 && $(this).caret().start == 0) ) {
    eve.preventDefault();
  }
  });
	 


function print_text(txt)
{
	$("div#divLoading").addClass('show');
	 setTimeout(function(){
				BTPrinter.connect(function(data){
						console.log("Success connect");
						//alert("Success connect");
						console.log(data);
				BTPrinter.printText(function(data){
				console.log("Success Print");
				//alert("Success Print");
				console.log(data);
				setTimeout(function(){
				BTPrinter.disconnect();	
				$("div#divLoading").removeClass('show');
				}, 2000)
				},function(err){
				$("div#divLoading").removeClass('show');
				console.log("Error Print!");
				//alert("Error Print!");
				console.log(err)
				//console.log(err.toString());
				}, txt)			
					},function(err){
						$("div#divLoading").removeClass('show');
						console.log("Error");
						//alert("Error2");
						//alert(err.toString());
						alert("Can't able to connect printer , Try again");
						console.log(err)
					}, localStorage.getItem("selected_printer_value"))  
		}, 2000);
	
	
				/*BTPrinter.list(function(data){
					console.log("Success");
					alert("Success list");
					console.log(data); 
					var device_name=data[0];
			  BTPrinter.connect(function(data){
						console.log("Success connect");
						alert("Success connect");
						console.log(data);
				BTPrinter.printText(function(data){
				console.log("Success Print");
				alert("Success Print");
				console.log(data)
				BTPrinter.disconnect(function(data){
				console.log("Success disconnected");
				alert("Success disconnected");
				console.log(data)
				},function(err){
				console.log("Error");
				alert("Error");
				alert(err.toString());				
				console.log(err)
				}, device_name);
				},function(err){
				console.log("Error Print!");
				alert("Error Print!");
				alert(err.toString());
				}, txt)			
					},function(err){
						console.log("Error");
						alert("Error2");
						alert(err.toString());
						console.log(err)
					}, device_name)
			 },function(err){
				 console.log("Error");
				alert("Error 3");
				alert(err.toString());
				 console.log(err);
			 })*/
}