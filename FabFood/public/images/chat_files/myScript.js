// JavaScript Document

/*
 * Form validate and AJAX calls for Cyberchef.
 *
 * Plugin Name: AJAXAN
 * Plugin URI:  ---
 * Description: Auto validation for single and multi forms and AJAX calls methods.
 * Version:     1.0
 * Author:      Puneet Kumar
 * Author URI:  http://www.dragontower.tk
 * License:     GPL 
 */

$(document).ready(function(){

	$('#submit').click(function(e){
		e.preventDefault();		
		$.post(			
			$('#cyberform').attr('action'),
			$('#cyberform').serialize(),
			function(data){
				response = $.parseJSON(data)
				 //console.log(response.url);
				// return false;
				$('.form-group .label-danger').html('');
				if(response.type=='error')
				{

					$('.notifyArea').show().addClass('alert-danger');
					$('.notifyArea strong').text(response.type+' ! ');
					$('.notifyArea span').html(response.notify);
					}
					else if(response.type=='list')
					{						
						$('#jsErrors').html(response.notify);
						}					
					else if(response.type=='success'){
							if(response.url!=''){							
								$(location).attr('href',response.url);
							}
							else{
								$('.notifyArea').show().addClass('alert-success');								
								$('.notifyArea span').html(response.notify);
							}
						}						
		   });
		})
	});

// Fot multiple form on single page.
$(document).ready(function(){

	$('.frontAjaxSubmit').click(function(e){	

		var form = $(this).closest('form');		
		e.preventDefault();		
		$.post(
			form.attr('action'),
			form.serialize(),
			function(data){
				response = $.parseJSON(data)
				//alert(response.type);
				// console.log(response.url);
				// return false;
				switch(response.type)
				{
					case 'error':
						$('.notifyArea').show().addClass('alert-danger');
						$('.notifyArea strong').text(response.type+' ! ');
						$('.notifyArea span').html(response.notify);
						break;

					case 'error_otp':
						//$('.notifyArea').show().addClass('alert-danger');
						$('.notifyArea strong').text(response.type+' ! ');
						$('.notifyArea span').html(response.notify);
						break;


					case 'list':
						$('.form-group .label-danger, .form-group .label-success').html('');
						$('#jsErrors').html(response.notify);
						break;

					case 'step2':
						$('#cyberform3').hide();
						$('#cyberform31').show();

					case 'success':
						var loc=(window.location);

				
						if(response.url!=''){	
								if(loc=="http://www.cyberchef.in/home/cricket#")	
								{

									$(".close").click();

								}	
								else
								{				
								$(location).attr('href',response.url);
								}
							}	
							else{								
								$('.email').text('');
								$('.label-success').text(response.notify);
							}
						break;
					}					
		   });
		})
	});
	
 $(document).ready(function(){
	 $("#checkAll").click(function () {
			if ($("#checkAll").is(':checked')) {
				$("input[type=checkbox]").each(function () {
					$(this).prop("checked", true);
				});
	
			} else {
				$("input[type=checkbox]").each(function () {
					$(this).prop("checked", false);
				});
			}
		});
	});

$(document).ready(function(){
	$('.filter-data').click(function(){
		var val = $(this).attr('value');
		var action = $(this).closest('form').attr('action');
		
		if(val!='')
			window.location.href ='/home/search/'+val;
	});

	$("#go_filter").click(function(){

			var meal_cat=$("input[name='radioInline']:checked").val();
			//alert(meal_cat);
			var price=$("#bootstrap-slider").val();
			//alert(price);

			path=document.domain;
			val=$(this).val();
			$.ajax({
					type:"POST",
					url:"http://"+path+"/home/setFilter",
					data:{cat:meal_cat,price:price},
					success:function()
					{
						//alert("hello");
						window.location.href='';

					},
					error:function()
					{
						alert("error");
					}



			});


	});

	/******************** serach veg nonveg*********************/

	/*$("input[name='radioInline']").click(function(){

	
		path=document.domain;
			val=$(this).val();
			$.ajax({
					type:"POST",
					url:"http://"+path+"/home/setVegNon",
					data:{val:val},
					success:function()
					{
						//alert("hello");
						window.location.href='';

					},
					error:function()
					{
						alert("error");
					}



			});
		});*/

			



	/********************************************************/
})


// Calender for chef`s scheduled items
$(document).ready(function(){
	$(".changeweek").click(function(e){
		e.preventDefault();
		var dateto = $(this).attr('value');
		var dt = $(this).attr('pk-date');
		$.ajax({
            type: "POST",
            url: "schedule",
            data: "dt="+dt+"&dateto="+dateto,
            success: function(result){
              $("#calander").html(result);
             }
           });
		return false;
	})
})



 
