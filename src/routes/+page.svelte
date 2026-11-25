<script lang="ts">
	import heroImage from '$lib/assets/mi_cherry_orchard_andresen.JPG';
	import { base } from '$app/paths';
	import Mailicon from '$lib/icons/mailicon.svelte';
</script>

<!-- HERO SECTION -->
<section class="bg-msu-dark text-white py-16 sm:py-20 px-4 sm:px-8 border-b-4 border-emerald-600">
	<div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
		<div class="lg:col-span-12">
			<h1 class="text-2xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
				Helping Michigan's Grower Community Make Sense of the Weather
			</h1>
		</div>
		<div class="lg:col-span-8">
			<div class="mb-8 max-w-2xl overflow-hidden rounded-xl shadow-lg border border-emerald-800">
				<img
					src={heroImage}
					alt="Michigan Cherry Orchard by Jeff Andresen"
					class="w-full h-auto object-cover"
				/>
			</div>

			<!-- disable these redunant buttons inside the hero element - already in the nav, but they are cute -->
			<!-- <div class="flex flex-wrap gap-4">
				<a href={`${base}/forecasts/`} class="btn bg-white text-msu-green hover:bg-emerald-50 hover:text-msu-dark font-bold border-none px-6 shadow">
					Forecast Reports
				</a>
				<a href={`${base}/weather/`} class="btn btn-outline text-white hover:bg-white/10 border-white px-6 font-semibold">
					Weather Guidance
				</a>
			</div> -->

		</div>

		<!-- Quick Info Panel -->
		<div class="lg:col-span-4 bg-emerald-950/70 backdrop-blur border border-emerald-500/30 p-6 rounded-xl text-white space-y-4">
			<h2 class="text-xl font-bold text-white border-b border-emerald-800 pb-2">
				Dr. Jeff Andresen 
			</h2>
			<p class="text-sm text-emerald-100 leading-relaxed">
				Professor of meteorology/climatology, <br/>
				Department of Geography, Environment, and Spatial Sciences
			</p>
			<p class="text-sm text-emerald-100 leading-relaxed">
				State Meteorologist
			</p>
			<p class="text-sm text-emerald-100 leading-relaxed">
				Geography Bldg rm 236A, <br/>
				673 Auditorium Road, East Lansing, MI 48824
			</p>
			<div class="pt-2">
				<a href="mailto:andresen@msu.edu" class="btn btn-sm btn-outline border-slate-300 text-slate-700 bg-slate-100">
					<Mailicon /> andresen@msu.edu
				</a>
			</div>
			<p class="text-sm text-emerald-100 leading-relaxed"></p>
			<div class="pt-2">
				<a href="https://geo.msu.edu/directory/andresen-jeffrey.html"
					class="text-xs font-bold text-emerald-300 hover:text-white underline inline-flex items-center gap-1"
				>
					Department Bio Page &rarr;
				</a>
			</div>
		</div>
	</div>
</section>

<!-- RESEARCH & SERVICES -->
<section class="max-w-7xl mx-auto px-4 sm:px-8 py-16" aria-label="Key Programs and Projects">
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="card bg-white shadow-md border border-slate-200 hover:border-msu-green transition-all">
			<div class="card-body p-6 flex flex-col justify-between">
				<div>
					<div
						class="w-12 h-12 rounded-lg bg-emerald-100 text-msu-green flex items-center justify-center font-bold mb-4"
						aria-hidden="true"
					>

					</div>
					<h2 class="card-title text-xl font-bold text-msu-dark">1. Enviroweather</h2>
					<p class="text-slate-600 text-sm leading-relaxed mt-2">
						Enviroweather delivers a sustainable weather-based information system for the state of Michigan. Operating nearly 100 industrial-grade automated weather stations across Michigan, feeding models for pest, plant production, and natural resource management decisions.
					</p>
				</div>
				<div class="card-actions justify-end mt-4">
					<a
						href="https://enviroweather.msu.edu"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-bold text-msu-green hover:underline inline-flex items-center gap-1"
					>
						enviroweather.msu.edu &rarr;
					</a>
				</div>
			</div>
		</div>

		<div class="card bg-white shadow-md border border-slate-200 hover:border-msu-green transition-all">
			<div class="card-body p-6 flex flex-col justify-between">
				<div>
					<div
						class="w-12 h-12 rounded-lg bg-emerald-100 text-msu-green flex items-center justify-center font-bold mb-4"
						aria-hidden="true"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
							></path>
						</svg>
					</div>
					<h2 class="card-title text-xl font-bold text-msu-dark">2. Weather Guidance for Growers</h2>
					<p class="text-slate-600 text-sm leading-relaxed mt-2">
						Seasonal weather briefings, climatological trends, degree-day accumulations, and weather risks tailored for agricultural producers across Michigan's distinct microclimates.
					</p>
				</div>
				<div class="card-actions justify-end mt-4">
					<a href={`${base}/weather/`} class="text-xs font-bold text-msu-green hover:underline inline-flex items-center gap-1">
						View Weather Guidance &rarr;
					</a>
				</div>
			</div>
		</div>

		<div class="card bg-white shadow-md border border-slate-200 hover:border-msu-green transition-all">
			<div class="card-body p-6 flex flex-col justify-between">
				<div>
					<div
						class="w-12 h-12 rounded-lg bg-emerald-100 text-msu-green flex items-center justify-center font-bold mb-4"
						aria-hidden="true"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							></path>
						</svg>
					</div>
					<h2 class="card-title text-xl font-bold text-msu-dark">3. MI Offset</h2>
					<p class="text-slate-600 text-sm leading-relaxed mt-2">
						Collaborative research with Dr. Michael Keifer, modeling odor plume dispersion using North American Regional Reanalysis (NARR) wind products for Michigan CAFO siting.
					</p>
					<p class="text-xs text-slate-500 italic mt-2">
						Note: MIOFFSet is currently undergoing renovations.
					</p>
				</div>
				<div class="card-actions justify-end mt-4">
					<a
						href="https://mioffset-2026-front-end.vercel.app"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-bold text-msu-green hover:underline inline-flex items-center gap-1"
					>
						MIOFFSet Website &rarr;
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FUNDING SPONSORS -->
<section class="max-w-7xl mx-auto px-4 sm:px-8 pb-16 text-center" aria-label="Research Sponsors">
	<p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 font-sans">Research Supported By</p>
	<div class="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-bold text-sm">
		<a
			href="https://usda.gov"
			target="_blank"
			rel="noopener noreferrer"
			class="p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-msu-green hover:text-msu-dark transition-colors"
		>
			USDA
		</a>
		<a
			href="https://www.canr.msu.edu/research/agbioresearch/"
			target="_blank"
			rel="noopener noreferrer"
			class="p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-msu-green hover:text-msu-dark transition-colors"
		>
			Michigan AgBioResearch (MABR)
		</a>
		<a
			href="https://www.canr.msu.edu/outreach/"
			target="_blank"
			rel="noopener noreferrer"
			class="p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-msu-green hover:text-msu-dark transition-colors"
		>
			MSU Extension
		</a>
		<a
			href="https://www.canr.msu.edu/project-greeen/"
			target="_blank"
			rel="noopener noreferrer"
			class="p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-msu-green hover:text-msu-dark transition-colors"
		>
			Project GREEEN
		</a>
		<a
			href="https://www.michigan.gov/mdard"
			target="_blank"
			rel="noopener noreferrer"
			class="p-3 border border-slate-200 rounded-lg bg-white shadow-sm hover:border-msu-green hover:text-msu-dark transition-colors"
		>
			Michigan Dept. of Agriculture & Rural Development
		</a>
	</div>
</section>
