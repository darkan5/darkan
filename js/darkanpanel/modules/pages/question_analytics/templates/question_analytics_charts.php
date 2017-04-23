<script id="analitics-chart-template" type="text/template">
    TEST
</script>


<script id="analitics-pie-chart-template" type="text/template">
    <div id="analitics-pie-chart"></div>
</script>

<script id="analitics-line-chart-template" type="text/template">
    <div id="analitics-line-chart"></div>
</script>

<script id="analitics-passed-percent-chart-template" type="text/template">

	<% if(percentCompleted && percentFailed) { %>

		<div class="col-md-12">
			<legend class="text-center"><?=Lang::get("darkanpanel.percent-chart-good-wrong")?></legend>
		    <div class="progress">
			  <div class="progress-bar progress-bar-striped progress-bar-success" style="width: <%- percentCompleted %>%">
			    <span class=""><%- percentCompleted %>%</span>
			  </div>
			  <div class="progress-bar progress-bar-striped progress-bar-danger" style="width: <%- percentFailed %>%">
			    <span class=""><%- percentFailed %>%</span>
			  </div>
			</div>
		</div>

	<% } %>
</script>

<script id="analitics-list-chart-template" type="text/template">

	<% if(typeof(chartData) !== "undefined") { %>

	<div class="col-md-12">
		<legend><?=Lang::get("darkanpanel.chart_list_useranswers")?> </legend>
		<ul class="analytics-list">
		
			<% _.each(chartData, function(answer) { %>
				<li><%-answer.name%> (<%-answer.hits%>)</li>
			<% }); %>
		
		<ul>
	</div>

	<% } else { %>

		<div><?=Lang::get("darkanpanel.infoEmpty")?></div>

	<% } %>
</script>