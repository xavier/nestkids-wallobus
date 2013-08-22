var apiRootUrl = 'data'; // Static files

$.ajaxSetup({
	contentType: 'application/json',
	crossDomain: true,
	dataType: 'json',
	type: 'GET',
	error: function(jqXHR, textStatus, errorThrown) {
		console.log('ERROR:', textStatus);
		//alert('ERROR: ' + textStatus);
	},
	success: function(data, textStatus, jqXHR) {
		console.log('data:', data);
	}
});
$.support.cors = true;


function stops_loadDatagrid()
{
	var url = apiRootUrl + '/stops.json'; // Static file, format as needed for display
	$.ajax({url: url, success: stops_loadDatagrid_success});
}

function stops_loadDatagrid_success(data, textStatus, jqXHR)
{
	var datagrid = $('#stops-results tbody');
	var source = $('#stops-results-template').html();
	console.log('source:', source);
	var template = Handlebars.compile(source);
	var context = {data: data};
	console.log('context:', context);
	var html = template(context);
	$('#stops-results').append(html).rowlink();
}
