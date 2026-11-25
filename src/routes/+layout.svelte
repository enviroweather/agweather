<script lang="ts">
	import './layout.css';
	import { asset } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Dynamic title based on page route data
	let documentTitle = $derived(
		page.data.title
			? `${page.data.title} | Agricultural Weather Office | MSU`
			: 'Agricultural Weather Office | Michigan State University'
	);

	// MSU Theme JS (to assist with accessibility)
	// only import after mount since these functions interact with the DOM
	onMount(async () => {
		const {
			initMobileNav,
			initAccessibleTabs,
			initModals,
			initCopyButtons,
			initPublicationFilters
		} = await import('$lib/index');

		initMobileNav();
		initAccessibleTabs();
		initModals();
		initCopyButtons();
		initPublicationFilters();
	});
</script>

<svelte:head>
	<link rel="icon" href={asset('/favicon.ico')} />
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="Agricultural Weather Office, Department of Geography, Environment and Spatial Sciences, Michigan State University"
	/>
	<meta name="text-scale" content="scale" />
	<title>{documentTitle}</title>
</svelte:head>

<Header pageTitle={page.data.pageTitle ?? 'Agricultural Weather Office'} />

<!-- Primary landmark with id="main-content" for WCAG skip-link targeting -->
<main id="main-content" class="flex-grow">
	{@render children()}
</main>

<Footer />
