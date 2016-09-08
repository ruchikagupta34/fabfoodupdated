
$(document).ready(function () {
    $('#d_youlikeslider').carousel({
        interval: 10000
    })
    $('.fdi-Carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });
});
//---------form-validation--------------

$(document).ready(function () {

    $('#d_dntlikeform').validate({
        rules: {
            emailid: {
                required: true,
                email: true
            },
            dishname: {
                required: true,
            },
			
			
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('').addClass('valid')
                .closest('.form-group').removeClass('error').addClass('success');
        }
    });
	
//----------------------------------------
$('#d_corporatecform').validate({
        rules: {
            orgname: {required: true,},
            contperson: {required: true,},
			contemail: {required: true,email:true,},
			//reqdetails: {required: true,},
			
			
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('').addClass('valid')
                .closest('.form-group').removeClass('error').addClass('success');
        }
    });	
	

});

//------------------------------------------
$(document).ready(function () {
	
$(function () {
    $('input,textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'))
               .attr('placeholder', '');
    }).blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});

});

//---------datatable-------------------
$(document).ready(function() {
    $('#datatable').dataTable();
    
     $("[data-toggle=tooltip]").tooltip();
    
} )

//---------------------------------------
$(document).ready(function() {
	
	$('.dd_filter').click(function(){
	$('.d_filterbox').slideToggle(700);	
		});
		
		$('#header,#main').click(function(){
		$('.d_filterbox').slideUp(700);	
			
			})

	
	$(function() {
        $('#policyselector').click(function(){
            $('.d_locs').slideToggle(500);
        }); 
    });
	
		
$('.d_pclose').click(function(){
$('.d_locs').slideUp(500);	
	})	   
    

//-------------------------------------

//----------------------------------

} );

$(document).ready(function(e) {
    $('.d_h1').click(function(){
	$('.d_offerbox').animate({left:'0px'},1000);
	$('.d_h2').css('display','block');
	$(this).css('display','none');
	})
	
	$('.d_h2').click(function(){
	$('.d_offerbox').animate({left:'-250px'},1000);
	$('.d_h1').css('display','block');
	$(this).css('display','none');
	})
	
	
	/*$('#filter').click(function(){
	$('.d_offerbox').animate({left:'-250px'},1000);
		})
		
		$('#wrapper').click(function(){
	$('.d_offerbox').animate({left:'-250px'},1000);
		})
		
		$('#main').click(function(){
	$('.d_offerbox').animate({left:'-250px'},1000);
		})*/
	
	
	
});


//-------------------------------------

$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});









