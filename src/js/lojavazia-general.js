$("input[type='button'],button").addClass('btn');

$('.sidebar ul').addClass('unstyled');

$('.navbar-inner ul').addClass('nav nav-pills');
$('.search').addClass('form-inline');
$('.collectionWrap ul').addClass('thumbnails');
$('.collectionWrap ul li').addClass('span3');
$('.collectionWrap .productImage').addClass('thumbnail');


$('.bread-crumb ul').addClass('breadcrumb');
$('.filterBy select').addClass('span4');
$('.resultado-busca-numero .label').removeClass('label');
$('.productDescriptionShort').addClass('muted');
$('.showHideService').addClass('alert alert-info');
$('#closeService').addClass('close');

$('.thumbs').addClass('unstyled thumbnails')
$('.thumbs li a').addClass('thumbnail')

// inlcusao de tags html necessarias
$('.bread-crumb ul li').append('<span class="divider">/</span>');	

$(function() {
	$('.pager')
		.addClass('pagination')
		.removeClass('pager');
	$('.pagination li').each(function() { 
		$(this).html('<a href="javascript:void(0);"><span>' + $(this).text() + '</span></a>');
	});	
});
