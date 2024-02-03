<?php  if(!defined('PLX_ROOT')) exit; 
	/**
		* Plugin 			Banque d'image
		*
		* @CMS required		PluXml 
		* @page				medias.php Widget
		* @version			0.0
		* @date				2024-01-19
		* @author 			G.Cyrille
		░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
		░       ░░        ░░       ░   ░░░  ░        ░        ░░      ░░░      ░░  ░░░░  ░░░░░░░░        ░        ░
		▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒  ▒    ▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒   ▒▒   ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
		▓       ▓▓      ▓▓▓▓▓▓▓▓  ▓▓  ▓  ▓  ▓      ▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓        ▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓  ▓▓▓▓
		█  ███  ██  ███████████  ███  ██    █  ██████████  ████  ████  █  ████  █  █  █  ████████  ██████████  ████
		█  ████  █        ████  ████  ███   █        ████  █  ██      ███      ██  ████  ████████        ████  ████
		███████████████████████████████████████████████████████████████████████████████████████████████████████████
		░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
		░       ░░  ░░░░░░░  ░░░░  ░  ░░░░  ░░      ░░       ░░░      ░░  ░░░░░░░        ░░      ░░░░░   ░░░  ░        ░        ░
		▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒  ▒▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒    ▒▒  ▒  ▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒
		▓       ▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓    ▓▓▓  ▓▓▓▓  ▓       ▓▓  ▓▓▓▓  ▓  ▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓      ▓▓▓▓▓  ▓  ▓  ▓      ▓▓▓▓▓▓  ▓▓▓▓
		█  ███████  ███████  ████  ██  ██  ██  ████  █  ███████  ████  █  ██████████  ██████████  ████  ██    █  ██████████  ████
		█  ███████        ██      ██  ████  ██      ██  ████████      ██        █        ██      ██  █  ███   █        ████  ████
		█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████  
	**/	
	//global $plxAdmin;
	# récupération d'une instance de plxMotor
	$plxMotor = plxMotor::getInstance();
	$plxPlug = $plxMotor->plxPlugins->getInstance(basename(__DIR__));	
?>
<link rel="stylesheet" href="<?php echo PLX_PLUGINS."unsplash/css/style.css" ?>" >
<link rel="stylesheet" href="<?php echo PLX_PLUGINS."unsplash/css/flex-images.css"?>" >
<dialog id="unsplashDialog">
	<div class="container top unsplash">
		<h1 class="hero-title">
			<span>
				<svg aria-hidden="true" data-prefix="fas" data-icon="camera-retro" class="icon-md camera" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H48zm0 32h106c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H38c-3.3 0-6-2.7-6-6V80c0-8.8 7.2-16 16-16zm426 96H38c-3.3 0-6-2.7-6-6v-36c0-3.3 2.7-6 6-6h138l30.2-45.3c1.1-1.7 3-2.7 5-2.7H464c8.8 0 16 7.2 16 16v74c0 3.3-2.7 6-6 6zM256 424c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-208c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm-48 104c-8.8 0-16-7.2-16-16 0-35.3 28.7-64 64-64 8.8 0 16 7.2 16 16s-7.2 16-16 16c-17.6 0-32 14.4-32 32 0 8.8-7.2 16-16 16z"></path></svg>
			</span>
		Recherche sur unsplash</h1>
		<form id="search-form-unsplash">
			<div class="alert-msg-unsplash"></div>
			<p><input type="search" class="search-unsplash" id="search-unsplash" placeholder="<?= L_SEARCH ?> : water drops ...">
				<input type="hidden" id="page-unsplash" value="1" >
			<input type="submit" value="<?= L_SEARCH ?>" class="submit"></p>
			<nav id="searchPagination-unsplash"></nav>
		</form>
	</div>
	<div id="success-unsplash"></div>
	<div class="container">
		<div class="search-text-unsplash"></div>
	</div>
	<div class="results-unsplash"></div>
	<div class="branding" id="bottom-unsplash">Powered by <a href="https://unsplash.com/" target="_blank">unsplash</a> && pluged in by <a href="https://pluxopolis.net" target="_blank">@PluXopolis</a> </div>
	<form method="dialog">
		<button type="button" onclick="this.closest('dialog').removeAttribute('open')"><?=  L_MEDIAS_BACK ?></button>
	</form>
</dialog>
<script> 
	const apikeyunsplash ='<?= $plxPlug->apikey ?>';
	let unsplashButton=` <button class="blue" type="button" onclick="document.querySelector('#unsplashDialog').setAttribute('open','')">Ajouter depuis unsplash</button> `;
	document.querySelector('.inline-form.action-bar').insertAdjacentHTML( 'beforeEnd', unsplashButton);
</script>
<script type="text/javascript" src="<?php echo PLX_PLUGINS."unsplash/js/flex-images.js" ?>"></script>
<script type="text/javascript" src="<?php echo PLX_PLUGINS."unsplash/js/script.js" ?>"></script>