<!DOCTYPE html>
<html lang="pt-br">
<head>
	<?php include("include/head.php"); ?>
</head>
<body onload="$('.loader').removeClass('loading');">
	<?php include("include/viewport-helper.php"); ?>
	<?php include("include/icons.php"); ?>
	<?php include("include/loader.php"); ?>
	<div id="wrapper">
		<?php include("include/nav.php"); ?>
		<div id="content">

			<form action="" class="form-wrapper">
				<div class="row">
					<div class="field-wrapper">
						<label for="1">full:</label>
						<input type="text" class="field">
						<a href="#" class="logout icon-wrapper" title="Pesquisar" data-toggle="modal" data-target="#myModal">
							<svg class="icon desktop-only">
								<use xlink:href="#magnifier" ></use>
							</svg>
						</a>
					</div>
				</div>
				<div class="row">
					<div class="field-wrapper half">
						<label for="1">half:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper half">
						<label for="1">half:</label>
						<input type="text" class="field">
					</div>
				</div>
				<div class="row">
					<div class="field-wrapper quarter">
						<label for="1">UF*:</label>
						<select class="field">
							<option value="" selected hidden>Selecione</option>
							<option value="AC">AC</option>
							<option value="AL">AL</option>
							<option value="AM">AM</option>
							<option value="AP">AP</option>
							<option value="AR">AR</option>
							<option value="AS">AS</option>
							<option value="AU">AU</option>
							<option value="BA">BA</option>
							<option value="BV">BV</option>
							<option value="CE">CE</option>
							<option value="CI">CI</option>
							<option value="CL">CL</option>
							<option value="CN">CN</option>
							<option value="CR">CR</option>
							<option value="DE">DE</option>
							<option value="DF">DF</option>
							<option value="EQ">EQ</option>
							<option value="ES">ES</option>
							<option value="FR">FR</option>
							<option value="GO">GO</option>
							<option value="HO">HO</option>
							<option value="IN">IN</option>
							<option value="IR">IR</option>
							<option value="IT">IT</option>
							<option value="KO">KO</option>
							<option value="MA">MA</option>
							<option value="ME">ME</option>
							<option value="MG">MG</option>
							<option value="MS">MS</option>
							<option value="MT">MT</option>
							<option value="PA">PA</option>
							<option value="PB">PB</option>
							<option value="PE">PE</option>
							<option value="PH">PH</option>
							<option value="PI">PI</option>
							<option value="PN">PN</option>
							<option value="PR">PR</option>
							<option value="PU">PU</option>
							<option value="PY">PY</option>
							<option value="RC">RC</option>
							<option value="RD">RD</option>
							<option value="RJ">RJ</option>
							<option value="RN">RN</option>
							<option value="RO">RO</option>
							<option value="RR">RR</option>
							<option value="RS">RS</option>
							<option value="SC">SC</option>
							<option value="SE">SE</option>
							<option value="SP">SP</option>
							<option value="TH">TH</option>
							<option value="TO">TO</option>
							<option value="UK">UK</option>
							<option value="UR">UR</option>
							<option value="US">US</option>
							<option value="VN">VN</option>
							<option value="WE">WE</option>
							<option value="WI">WI</option>
						</select>
					</div>
					<div class="field-wrapper quarter">
						<label for="1">quarter:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper quarter">
						<label for="1">quarter:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper quarter">
						<label for="1">quarter:</label>
						<input type="text" class="field">
					</div>
				</div>
				<div class="row">
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
					<div class="field-wrapper eighth">
						<label for="1">eighth:</label>
						<input type="text" class="field">
					</div>
				</div>
			</form>
		</div>
		<?php include("include/footer.php"); ?>
		<?php include("include/modal.php"); ?>
		<?php include("include/scripts.php"); ?>
	</div>
</body>
</html>
