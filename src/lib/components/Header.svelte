<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import MichiganIcon from '$lib/icons/MichiganIcon.svelte'
	import MSUMastHead from '$lib/components/MSUMastHead.svelte'

	import { base } from '$app/paths';
	let { pageTitle = 'Agricultural Weather Office' }: { pageTitle?: string } = $props();
</script>

<header class="w-full">
	<!-- HEADER: Tier 1 - MSU Masthead (Institutional Brand Bar)                   -->
	<div class="msu-masthead w-full px-4 sm:px-8 py-2.5 sm:py-3 border-b-2 border-msu-dark">
	<div class="max-w-7xl mx-auto w-full flex items-center justify-between">
		<!-- Left: Official MSU Wordmark Lockup (strictly left-aligned) -->
		<div class="flex items-center justify-start shrink-0">
		<a href="https://msu.edu" target="_blank" rel="noopener noreferrer" class="flex items-center text-white hover:text-emerald-200 transition-colors py-0.5 group" aria-label="Michigan State University Homepage (opens in new tab)">
		<MSUMastHead />
		</a>
		</div>

		<!-- Right: Institutional Tools & Search -->
		<nav aria-label="MSU Institutional Links" class="flex items-center gap-4 text-xs text-emerald-100 font-medium">
		<a href="https://msu.edu/search" target="_blank" rel="noopener noreferrer" class="hover:text-white flex items-center gap-1.5 py-1 underline-offset-4 hover:underline">
			<svg class="w-3.5 h-3.5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
			<span class="hidden sm:inline">Search MSU</span>
		</a>
		<!-- <a href="https://comms.msu.edu/resources/web-standards" target="_blank" rel="noopener noreferrer" class="hidden md:inline-block hover:text-white underline-offset-4 hover:underline">Web Standards</a> -->
		<a href="https://msue.msu.edu" target="_blank" rel="noopener noreferrer" class="hidden md:inline-block hover:text-white underline-offset-4 hover:underline">MSU Extension</a>
		</nav>
	</div>
	</div>

	<!-- Unit / Site Identity & Local Navigation                  -->
	
	<div class="msu-unit-bar w-full">
	<div class="max-w-7xl mx-auto w-full px-4 sm:px-8 py-3 sm:py-4">
		<div class="flex items-center justify-between gap-4">
		<!-- Department Hierarchy & Site Title -->
			<div class="min-w-0">
				<div class="text-xs uppercase tracking-wider text-emerald-800 font-semibold mb-0.5 truncate">
					<span><a href="https://geo.msu.edu">Department of Geography, Environment and Spatial Sciences</a></span><span class="mx-1.5 text-slate-700" aria-hidden="true">/</span><span>College of Social Science</span>
				</div>
				<h1>
					<a href={`${base}/`} class="text-lg sm:text-2xl font-extrabold text-msu-dark hover:text-msu-green transition-colors block truncate">
					{pageTitle}
					</a>
				</h1>
				
			</div>

			<!-- Actions & Mobile Hamburger -->
			<div class="flex items-center gap-2 sm:gap-3 shrink-0">
				<a href="https://enviroweather.msu.edu" class="btn btn-outline btn-sm border-msu-green text-msu-green hover:bg-msu-green hover:border-msu-green hover:text-white font-semibold hidden lg:inline-flex">
				<MichiganIcon />
				Enviroweather
				</a>
				
				<!-- Mobile Menu Toggle Button (< md) -->
				<button 
				type="button" 
				class="md:hidden btn btn-ghost btn-sm text-msu-dark hover:bg-slate-100 flex items-center gap-1.5 border border-slate-300 px-2.5 py-1.5" 
				data-toggle-nav="true" 
				aria-controls="lab-nav-menu" 
				aria-expanded="false" 
				aria-label="Toggle navigation menu"
				>
				<svg class="h-5 w-5 nav-icon-open" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
				<svg class="h-5 w-5 nav-icon-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
				<span class="font-bold text-xs uppercase tracking-wider">Menu</span>
				</button>
			</div>
		</div>

		<Nav />

	</div>
	</div>
</header>