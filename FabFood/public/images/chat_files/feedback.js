$(document).ready(function(){


	$(".glyphicon").click(function(){

		var id=$(this).attr("id").split("-");
		$("#"+id[0]).val(id[1]);
		$("."+id[0]).text(id[1]+'.0');

		var i=parseInt("1");
		for(i=1;i<=5;i++)
		{
			if(i<=parseInt(id[1]))
			{
				$("#"+id[0]+"-"+i).removeClass("glyphicon-star-empty");
				$("#"+id[0]+"-"+i).addClass("glyphicon-star");
			}
			else
			{
				$("#"+id[0]+"-"+i).addClass("glyphicon-star-empty");
				$("#"+id[0]+"-"+i).removeClass("glyphicon-star");
			}	
		}	
		
	})
});