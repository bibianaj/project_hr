function init_dt(table_id, table_data, ajaxURL, buttons, callback) {
	
	if(!buttons) buttons = [
	];

	var aoColumns = [];
	var align_left = [];
	var align_center = [];
	var align_right = [];
	$.each(table_data, function(index, value) {
		var title = value['title'];
		var data = value['data'];
		var align = value['align'];

		switch (align) {
		case 1:
			align_center.push(index);
			break;
		case 2:
			align_right.push(index);
			break;
		default:
			align_left.push(index);
		}

		aoColumns.push({
			"sTitle" : title,
			"mData" : data
		});
	});

	var dt = $("#" + table_id).DataTable({
//		"select" : true,
		"dom" : 'Bfrtip',
		"aoColumns" : aoColumns,
		"ajax" : {
			url : ajaxURL,
			"dataSrc" : ""
		},
		"fnRowCallback" : function(rowHtml, aData, iDisplayIndex, iDisplayIndexFull) {

			$.each(table_data, function(index, value) {

				var cell_data = aData[value];

				$("td:eq(" + index + ")", rowHtml).html(cell_data);
			});

		},
		"columnDefs" : [ {
			"targets" : align_left,
			"className" : "dt-left"
		}, {
			"targets" : align_center,
			"className" : "dt-center"
		}, {
			"targets" : align_right,
			"className" : "dt-right"
		} ],
		"buttons": buttons
	});
	
	if(callback) {
		callback();
	}
	
	return dt;

}