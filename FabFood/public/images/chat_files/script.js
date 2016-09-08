$(document).ready(function(){

		$("#grand_total_ac").text($("#grand_total").text()); //16-02-16 show the grand total
	
	    $('[data-toggle="tooltip"]').tooltip(); 
		
		var width;
		width= $(window).width();
		if(width<=400){
			
			//$('#add-xs').append('&nbsp;<span class="vmdl">'+$('#login').html()+'</span>');
			$('#add-xs').append('&nbsp;&nbsp;<span class="vmdl">'+$('#addTofav').html()+'</span>');
		}
	
	
	$('#loginModal a.close').click(function(){
                 
        $(" .modal input, textarea").val("");
		 location.reload();
                 
	});
	
	$(' ul.share > li:not(" .head-title") ').hide();
	$('ul.share >li.head-title ').click(function(){
		$(this).siblings().slideToggle('slow');

	});
	
		$('ul.share ').mouseleave(function(){
		$(this).children(' li.head-title').siblings().hide(700);

	});
	
	/* sold out */
	var sold = ' <span class="sold red"> <b class="text-uppercase"> sold out </b></span><p>&nbsp;</p>';
	$('.sold_out').html(sold).addClass('pad0');
	
$('.product-img ').mouseenter(function(){
		if($(this).children('div.cart-info-dish').css("display")=="none"){	$(this).children(' div.product-desc').fadeIn(300).clearQueue();}
	});
$('.product-desc').mouseleave(function(){
		
	$('.product-img > div.product-desc').fadeOut(100).clearQueue();
	
	});
	
	//add to cart
 

$('.update-cart').click(function(){
	// alert("true");  
	var itm_id =  $(this).attr('title');
	var pr = $('#price_'+itm_id).text();
	var qtnty = $('#qtnty_'+itm_id).text(); 
	var grndTotal = $('#grand_total').text();
	var finalPr = qtnty*pr;
	//alert($(this).attr('id'));
	if(qtnty > 1 || $(this).attr('id')=='add'){
		if($(this).attr('id')=='add'){
			var fp = parseInt(finalPr)+parseInt(pr);
				$('#qtnty_'+itm_id).text(parseInt(qtnty)+1);
				$('#grand_total').text(parseInt(grndTotal)+parseInt(pr));
				$('#grand_total_ac').text(parseInt(grndTotal)+parseInt(pr));
				$('#addet_item_cart_'+itm_id).text(parseInt(qtnty)+1);
				var action = 'delete';
		}else{
			var fp = parseInt(finalPr)-parseInt(pr);  
			$('#qtnty_'+itm_id).text(parseInt(qtnty)-1);
			$('#grand_total').text(parseInt(grndTotal)-parseInt(pr));
			$('#grand_total_ac').text(parseInt(grndTotal)-parseInt(pr));
			$('#addet_item_cart_'+itm_id).text(parseInt(qtnty)-1);
			var action = 'delete';
		}
	//alert(fp);
	//alert('test');
	$('#rupee_'+itm_id).html('<i class="fa fa-inr "></i> '+fp); 
	$('#price_'+itm_id).text(pr); 
	$.ajax({
            type: "GET",
            url: "http://www.cyberchef.in/home/addtocart",
            data: "totalitme=1&item_id="+itm_id+"&price="+pr+"&custid=''&action="+action,
            success: function(msg){            
			 var obj = jQuery.parseJSON(msg);
             $("#cart").html(obj.totalincart);
            }
          }); 
	return false;
	}else{
		//alert("Product number should not be below 1,if you want to remove then click on remove product.");
		return false;
		}
});

 


$('button.js-btn-plus').click(function(){ 
		var pid = $(this).attr('id')
		var res = pid.split("-");
		var price = res[0]; 
		var itemid = res[1];	
		var avlqty = res[2];
		var custid = res[3];			
		var mealtime = res[4];
		var scid = res[5];
		var dayfilter = res[6];
		var current_daywise = $('#current_daywise').val();
		if(current_daywise =='')
		{
		current_daywise = dayfilter;
		}

		/*if(price>='120')
		{
			$('#chk').attr('disabled',false);
		}	*/	
	 
		//alert(current_daywise+"--"+dayfilter);
		var current_slote = $('#current_slote').val();
		var itemCount;
		itemCount = $(this).prev('.addet_item_cart').html();
		if(itemCount >= 1){ 
		var inc	= parseInt(itemCount);
		}else{ inc = 0; };
		//alert(inc+'-'+avlqty);
		if(current_slote !=res[4] && current_slote!=''){
			//alert("Please complete ordering one meal slot before placing an order for other.");
			$('.popupoverlay').show();
			$('#altMsg').text('Please complete ordering one meal slot before placing an order for other!');
			return false;
		}else if(current_daywise !=res[6] && current_daywise !=''){
			//alert("Please complete ordering one day before placing an order for other.");
			$('.popupoverlay').show();
			$('#altMsg').text('Please complete ordering one meal slot before placing an order for other!');
			return false;
		}else if(inc >= avlqty){
			//alert("Item out of stock!");
			$('.popupoverlay').show();
			$('#altMsg').text('Item out of stock!');
			return false;
		}else if(custid < 1){
			$("#logintrigger").click(); 
			return false;
		}else{
			//alert("addItem="+inc+"&avlqty="+avlqty); return false;
	
		var btnPlace = $(this).parent().parent().attr('title');
        //alert(btnPlace);
		
		//alert(inc);
		inc++ ;
		$(this).prev('.addet_item_cart').html(inc);
		
		$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').children('.no-of-item-cart').html(inc);
		$('#home_item_add_button_'+itemid+' .js--add-btn').css("display","none");
		$(this).parent().next().css({ "margin-top":"-15px","margin-bottom":"20px","display":"block"});
		$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').css({ "display":"block"});
		
		if(btnPlace == 'popup_product'){
		   $('.home_item_add_button_'+itemid+' .button-group .addet_item_cart').text(inc);
		   $('.home_item_add_button_'+itemid+' .button-group').css({ "margin-top":"-15px","margin-bottom":"20px","display":"block"});	
		}else{
		   $('.popup_item_add_button_'+itemid+' .button-group .addet_item_cart').text(inc);
		   $('.popup_item_add_button_'+itemid+' .button-group').css({ "margin-top":"-15px","margin-bottom":"20px","display":"block"});		
		}
		
			$.ajax({
				type: "GET",
				url: "http://www.cyberchef.in/home/addtocart",
				data: "totalitme=1&item_id="+itemid+"&price="+price+"&custid="+custid+"&mealtime="+mealtime+"&scid="+scid+'&current_daywise='+current_daywise,
				success: function(msg){            
				var obj = jQuery.parseJSON(msg);
				$("#cart").html(obj.totalincart);

				// timer start  
				$("#minutes").html(obj.minutes);
			    $("#sec").html(obj.sec);
			    var min= $("#minutes").val(obj.minutes);
			    $('#m_timer').countdowntimer({
                minutes :obj.minutes,
                seconds :obj.sec,
                size : "lg"
           				 }); 
			     // timer end 


				 var retId = itemid+'-'+custid+'-'+obj.basketId;
				 //alert(retId);
				 $('button[itemid="itemcount-'+itemid+'"]').attr('id',retId);
				 if(btnPlace == 'popup_product'){
					 $('.home_item_add_button_'+itemid+' .button-group button[itemid="itemcount-'+itemid+'"]').attr('id',retId);
				 }else{
				 	 $('.popup_item_add_button_'+itemid+' .button-groupbutton[itemid="itemcount-'+itemid+'"]').attr('id',retId);
				 }
				 
			
					if(current_slote==''){
						$('#current_slote').val(mealtime);
					}

					if(current_daywise==''){
						$('#current_daywise').val(dayfilter);
					}
					
				}
			});  
			}
			var t=parseInt($(this).prev(".addet_item_cart").text());
			/*************** for 08-03*****************************/
			if(t>1)
			{
				$(".sing-pul").text("Items in cart");
			}

			
return false;
		
	});


		
/*$('button.js-btn-plus').click(function(){ 

		var itemCount;
		itemCount = $(this).prev('.addet_item_cart').html();

		var inc	= parseInt(itemCount);
		inc++ ;
		$(this).prev('.addet_item_cart').html(inc);
		$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').children('.no-of-item-cart').html(inc);
		var id = $(this).closest("li").parent().attr('id'); 
		var price = $(this).closest("li").siblings('li.meal-discription').find('span.item-cost').html();
		
		var rupee = parseInt(price);
			var res= id.split("-");
			itemid=res[1];
			
		 $.ajax({
            type: "GET",
            url: "Home/addtocart",
            data: "totalitme=1&item_id="+itemid+"&price="+rupee+"&custid=",
            success: function(msg){            
             var obj = jQuery.parseJSON(msg);
             $("#cart").html(obj.totalincart);
              
            }
          }); 


		
	});*/
	
	$('button.js-btn-minus').click(function(){
		// timer start here
		 /* $('#m_timer').countdowntimer({
                minutes :5,
                size : "lg"
            }); */
		 // timer end  here

		//alert('Hari Test');
		
		var itemCount;
		itemCount = $(this).next('.addet_item_cart').text();
		var dec= parseInt(itemCount);
		var itemid = $(this).attr('id');
		var btnPlace = $(this).parent().parent().attr('title');
        //alert(btnPlace);
		if(dec!=0){ 
			var res2    = itemid.split("-");
			var price   = $(this).closest("li").siblings('li.meal-discription').find('span.item-cost').html();
			var rupee   = parseInt(price);
			var item_id = res2[0];
			var cust_id = res2[1];
			var delId   = res2[2];
			var typeT    = res2[3];

			var grand_total = $('#grand_total').text();		 
			/*if(grand_total<'120')
				{
			$('#chk').attr('disabled',true);
				}*/

				//alert(grand_total);

			if(delId!=''){
			$.ajax({
            type: "GET",
            url: "http://www.cyberchef.in/home/minustocart",
            data: "delId="+delId+'&item_id_dish='+item_id,
            success: function(msg){ 
				 var obj = jQuery.parseJSON(msg);
				if($.isNumeric(obj.totalincart))
				{		
				}else
				{
					window.location="http://www.cyberchef.in";
				}

				 if(obj.totalincart != ''){
					 var tt = obj.totalincart;
				 }else{
					 var tt = '&nbsp;'; 
				 }
				 $("#cart").html(tt);
				 if(typeT!=''){ var extCart = "-cart";}else{ extCart = "";}
				 var retId = item_id+'-'+cust_id+'-'+obj.basketId+extCart;
				 //alert(retId);
				 $('button[itemid="itemcount-'+item_id+'"]').attr('id',retId);
				 if(btnPlace == 'popup_product'){
					 $('.home_item_add_button_'+item_id+' .button-group button[itemid="itemcount-'+item_id+'"]').attr('id',retId);
				 }else{
				 	 $('.popup_item_add_button_'+item_id+' .button-groupbutton[itemid="itemcount-'+item_id+'"]').attr('id',retId);
				 }
				 
				 }
          }); 
		dec-- ;		 
		$(this).next('.addet_item_cart').html(dec);
		$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').children('.no-of-item-cart').html(dec);
		if(btnPlace == 'popup_product'){
		   $('.home_item_add_button_'+item_id+' .button-group .addet_item_cart').text(dec);	
		}else{
		   $('.popup_item_add_button_'+item_id+' .button-group .addet_item_cart').text(dec);
		}
		
		}

			if(dec==0){
				  

				/************************************16-02-16**********************************************************/
				/************************************* manage the total and grand total**************************************/
				
				//var cost  = parseInt(price);
				//alert(cost);
				var cost=$(this).siblings('button.js-btn-plus').attr("id");
				cost1=parseInt(cost);
				var gt=parseInt($("#grand_total").text());
				var gta=parseInt($("#grand_total_ac").text());
				gt=gt-cost1;
				gta=gta-cost1;
				$("#grand_total").text(gt);
				$("#grand_total_ac").text(gta)
				/******************************************************************************/

				if( typeT == 'cart'){ $('#cart_item_'+item_id).remove();}
				$(this).next('.addet_item_cart').html('1');
				$('#current_slote').val('');
				$(this).parent().hide();
				$(this).parent().prev().show(); 
				$(this).parent().prev().children().show();   
			}
		}else{
			/*$(this).parent().css("display","none");
			$(this).parent().prev().children().css("display","block"); 
			$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').css({ "display":"none"}); */
			$(this).parent().hide();
			$(this).parent().prev().show(); 
 			$(this).parent().prev().children().show(); 
			}

			var t=parseInt($(this).next(".addet_item_cart").text());

			/****************** for 08-03*******************************/
			if(t<=1)
			{
				$(".sing-pul").text("Item in cart");
			}
			/***************************************************************/
	});
	
	
$('button.js--add-btn').click(function(){
/*		$(this).parent().next().children('button.js-btn-plus').trigger( "click" );
		$(this).css("display","none");
		$(this).parent().next().css({ "margin-top":"-15px","margin-bottom":"20px","display":"block"});
		$(this).closest("li").siblings('li.product-img').children('div.cart-info-dish').css({ "display":"block"});*/
	});
	
	
/*	
	function scaleToFill() {
    $('#video-bg').each(function(index, videoTag) {
       var $video = $(videoTag),
           videoRatio = videoTag.videoWidth / videoTag.videoHeight,
           tagRatio = $video.width() / $video.height(),
           val;
        
       if (videoRatio < tagRatio) {
           val = tagRatio / videoRatio * 1.02; <!-- size increased by 2% because value is not fine enough and sometimes leaves a couple of white pixels at the edges -->
       } else if (tagRatio < videoRatio) {
           val = videoRatio / tagRatio * 1.02;
       }
       
       $video.css('transform','scale(' + val  + ',' + val + ')');

    });    
}

$(function () {
    scaleToFill();
    
    $('#video-bg').on('loadeddata', scaleToFill);
    
    $(window).resize(function() {
        scaleToFill();
    });
});
	*/
// update cart value
$('.cartItems button').click(function(){

	
	var cnt = $(this).parent().find('.addet_item_cart').text();
	var itId = $(this).attr('title');
	var prce = $('#price_'+itId).text();
	var grandTotal = $('#grand_total').text();
	var dataVal = $(this).attr('data-val');
	$('#qtnty_'+itId).text(cnt); 

	var added=$('#item_qnty_hidden_'+itId).val();
	$('#item_qnty_hidden_'+itId).val(cnt); 
	$('#rupee_'+itId).html('<i class="fa fa-inr "></i> '+cnt*prce); 
	if(dataVal=='minus'){
		$('#grand_total').text(grandTotal-prce);
		$('#grand_total_ac').text(grandTotal-prce);
	}else{

		/*********************** manage total and grand total on cart page when item is increased************************/
		var qty=$(this).attr('id');
		var nqty=qty.split("-");

		if(nqty[2]==added)
		{
			/********************dont do anything when item is out of stock***********************/
		}
		else
		{	
		$('#grand_total').text(parseFloat(grandTotal)+parseFloat(prce));
		$('#grand_total_ac').text(parseFloat(grandTotal)+parseFloat(prce));	
		/********************************************************************/
	}
	}
     if(cnt == 0){
		 $('#basket_id_'+itId).remove();
		 var pcnt = $('#full-cart .basket').length;
		 //alert(pcnt);
		 if(pcnt == 0){
		 $('#full-cart').html('<h2>No Item in Cart.</h2>');
		 }
		 }
});
//remove item from cart and favorite
$('.item-remove').click(function(){
	var allData = $(this).attr('id');	
	var spdta = allData.split("-");
	var type  = spdta[0];
	var itemId = spdta[1];
	var custId = spdta[2];

	$.ajax({
		   url: 'http://www.cyberchef.in/home/remove_cart_fav_item',
		   data: 'type='+type+'&item_id='+itemId+'&cust_id='+custId,
		   type: 'POST',
		   success: function(data){

			   if(type == 'cart'){
				   
				   var qtnty = $('#qtnty_'+itemId).text();
				   var price = $('#price_'+itemId).text();
				   var finPr = qtnty*price;
				   //alert(qtnty+'-'+price+'-'+finPr);
				   var grT = $('#grand_total').text();
				   var chPtce = grT-finPr;
				    
				   if(chPtce=='0')
				   {
				    window.location="http://www.cyberchef.in";
				   }

				    $('#cart_item_'+itemId).remove();
				   $('#grand_total').text(chPtce);
				   $('#grand_total_ac').text(chPtce);	

					
			   }else{

			   		$('#fav_'+itemId).remove();	   
			   }
			}
		   })
});
// use for sector delevery charges 

$(function() {
    $('#sector').change(function(){


    	var total=$('#totalAmt').val();  
    	//alert(total); 	 
        var x = $(this).val();
        var res= x.split("_");
        $('#dcharge').val(res[1]);
        $('#dchargeDiv').html(res[1]);
        $('#hdsector').val(res[0]);
         var finaltotal=parseFloat(total)+parseFloat(res[1]);      
         var cityid=res[2];

		//$('#chk2').attr('disabled',true);

      if(parseInt(cityid)=='1')
      {
      	var dVal='200';
      }else
      {
      	var dVal='100';
      }
       var minVal=res[3];
      //alert(total+" "+minVal);


      if(parseInt(total)>=parseInt(dVal))
    	{    			 
		  $('#dchargeDiv').html('0');
		  $('#dcharge').val('0');
		  $('#grand_total_ac').text(parseFloat(total)+parseFloat(0));
    	}else{    		 
         $('#grand_total_ac').text(parseFloat(total)+parseFloat(res[1]));
   		}
       // $('#grand_total_ac').text(parseFloat(total)+parseFloat(res[1]));

    if(parseInt(total)>=parseInt(minVal))
      {
      	//$('#chk2').attr('disabled',false);
      	$('#dcharge').val('0');
      }else
      {
      	//$('#chk2').attr('disabled',true);
      	alert("Minimum Order For this sector is "+minVal);
      	$("#sector").val("");
      }

       /******************* set delivery charge by sachin*************************/
        setTimeout(function(){

        		if(parseInt(total)<=parseInt(dVal))
        	{		
			 $("#dcharge").val(res[1]);
			}



}, 2000);
/*****************************************************/   



    });
});



});
