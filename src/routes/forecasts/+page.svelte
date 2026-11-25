<script lang="ts">
    import type { PageData } from './$types';
    import type { SixtyHrForecastResponse } from '$lib/types/forecast';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { jsonToCsv, downloadCsv } from '$lib/csv';

    let { data }: { data: PageData } = $props();
    let forecast = $state<SixtyHrForecastResponse | null>(null);
    let fetchError = $state<string | null>(null);
    let isLoading = $state(true);

    $effect(() => {
        const station = data.currentStation.code;
        const controller = new AbortController();

        forecast = null;
        fetchError = null;
        isLoading = true;

        fetch(`${base}/api/forecast-proxy.php?station=${encodeURIComponent(station)}`, {
            signal: controller.signal,
            headers: { Accept: 'application/json' }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const detail = await response.text();
                    throw new Error(detail.trim() || `Forecast request failed with status ${response.status}.`);
                }
                return (await response.json()) as SixtyHrForecastResponse;
            })
            .then((result) => {
                forecast = result;
            })
            .catch((error: unknown) => {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                fetchError = error instanceof Error ? error.message : 'Failed to retrieve forecast data.';
            })
            .finally(() => {
                if (!controller.signal.aborted) isLoading = false;
            });

        return () => controller.abort();
    });

    function handleDownloadCsv() {
        if (!forecast) return;
        const csv = jsonToCsv(forecast.forecasts);
        downloadCsv(`${forecast.station}-forecast.csv`, csv);
    }

    // Group stations by region for accessible and clean <optgroup> selection
    let stationsByRegion = $derived.by(() => {
        const map = new Map<string, typeof data.stations>();
        for (const station of data.stations) {
            const group = map.get(station.region) ?? [];
            group.push(station);
            map.set(station.region, group);
        }
        return Array.from(map.entries());
    });

    function handleStationSelect(event: Event) {
        const target = event.target as HTMLSelectElement;
        const code = target.value;
        goto(`${base}/forecasts/?station=${encodeURIComponent(code)}`, {
            keepFocus: true,
            noScroll: true
        });
    }

    function formatDateTime(isoString: string): { dateStr: string; timeStr: string } {
        try {
            const d = new Date(isoString);
            const dateStr = d.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                timeZone: 'America/Detroit'
            });
            const timeStr = d.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                timeZone: 'America/Detroit'
            });
            return { dateStr, timeStr };
        } catch {
            return { dateStr: isoString, timeStr: '' };
        }
    }

    function formatInitializedAt(isoString: string): string {
        try {
            const d = new Date(isoString);
            return d.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short',
                timeZone: 'America/Detroit'
            });
        } catch {
            return isoString;
        }
    }

    // Calculate summary stats across the 60h period
    let summaryStats = $derived.by(() => {
        if (!forecast || !forecast.forecasts.length) return null;
        const temps = forecast.forecasts
            .map((f) => f.temperature)
            .filter((t): t is number => t !== null);
        const maxTemp = temps.length ? Math.max(...temps) : null;
        const minTemp = temps.length ? Math.min(...temps) : null;
        const precipProbs = forecast.forecasts
            .map((f) => f.precipitation_probability_6h)
            .filter((p): p is number => p !== null);
        const maxPrecipProb = precipProbs.length ? Math.max(...precipProbs) : null;
        const totalPrecip = forecast.forecasts.reduce((acc, f) => {
            return acc + (f.precipitation_amount_6h ?? 0);
        }, 0);

        return {
            maxTemp,
            minTemp,
            maxPrecipProb,
            totalPrecip: totalPrecip > 0 ? totalPrecip.toFixed(2) : '0.00'
        };
    });
</script>

<svelte:head>
    <title>{data.title} | MSU Agricultural Weather Office</title>
</svelte:head>

<div class="py-8 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto space-y-8">
        <!-- HERO SECTION -->
        <div class="bg-msu-dark text-white p-6 sm:p-8 rounded-2xl shadow-lg border-b-4 border-emerald-500">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <span class="badge bg-emerald-800 text-emerald-200 border-none font-bold text-xs uppercase tracking-wider mb-2">
                        MAWN / NBM 60-Hour Guidance
                    </span>
                    <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Agricultural Forecast Reports
                    </h1>
                    <p class="text-slate-200 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                        60-hour point forecast guidance from the National Blend of Models (NBM/NBS), processed for Michigan Automated Weather Network (MAWN) stations.
                    </p>
                </div>

                <!-- STATION PICKER -->
                <div class="w-full sm:w-auto bg-emerald-950/70 p-4 rounded-xl border border-emerald-700/50">
                    <label for="station-picker" class="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1.5">
                        Select Weather Station
                    </label>
                    <select
                        id="station-picker"
                        class="select select-bordered select-sm w-full sm:w-80 bg-white text-slate-800 font-medium"
                        value={data.currentStation.code}
                        onchange={handleStationSelect}
                        aria-label="Select weather station for forecast"
                    >
                        {#each stationsByRegion as [region, stations] (region)}
                            <optgroup label={region}>
                                {#each stations as station (station.code)}
                                    <option value={station.code}>
                                        {station.name} ({station.code.toUpperCase()})
                                    </option>
                                {/each}
                            </optgroup>
                        {/each}
                    </select>
                    <p class="text-[11px] text-emerald-300/80 mt-1.5">
                        Station: <span class="font-bold text-white uppercase">{data.currentStation.code}</span> •
                        Data loaded through the site's PHP proxy
                    </p>
                </div>
            </div>
        </div>

        {#if isLoading}
            <div class="alert bg-slate-50 border border-slate-200 shadow-sm" role="status" aria-live="polite">
                <span class="loading loading-spinner text-emerald-800" aria-hidden="true"></span>
                <span>Loading forecast data for {data.currentStation.name}…</span>
            </div>
        {/if}

        <!-- ERROR ALERT -->
        {#if fetchError}
            <div class="alert alert-error shadow-md border-l-4 border-red-700 text-left" role="alert">
                <svg class="stroke-current shrink-0 h-6 w-6 text-red-700" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h2 class="font-bold">Unable to Load Forecast Data</h2>
                    <p class="text-sm">{fetchError}</p>
                    <p class="text-xs text-slate-600 mt-1">
                        Please choose another station from the dropdown above, or verify network connectivity to the MAWN data server.
                    </p>
                </div>
            </div>
        {/if}


        <!-- FORECAST CONTENT -->
        {#if forecast}
            <!-- STATION METADATA & SUMMARY CARDS -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Selected Station</div>
                    <div class="text-base font-extrabold text-msu-dark mt-1 truncate">
                        {data.currentStation.name}
                    </div>
                    <div class="text-xs text-emerald-800 font-mono mt-0.5">
                        Code: {forecast.station}
                    </div>
                </div>

                <!-- some summary numbers, don't really need these -->
                <!-- <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">60h Temp Range</div>
                    <div class="text-lg font-extrabold text-msu-dark mt-1">
                        {#if summaryStats && summaryStats.minTemp !== null && summaryStats.maxTemp !== null}
                            <span class="text-blue-700">{Math.round(summaryStats.minTemp)}°{forecast.units.temperature}</span>
                            <span class="text-slate-400 font-normal mx-1">to</span>
                            <span class="text-emerald-800">{Math.round(summaryStats.maxTemp)}°{forecast.units.temperature}</span>
                        {:else}
                            N/A
                        {/if}
                    </div>
                    <div class="text-xs text-slate-500 mt-0.5">Min / Max across period</div>
                </div> -->

                <!-- <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Max Precip Probability</div>
                    <div class="text-lg font-extrabold text-msu-dark mt-1">
                        {summaryStats?.maxPrecipProb !== null ? `${Math.round(summaryStats?.maxPrecipProb ?? 0)}%` : '0%'}
                    </div>
                    <div class="text-xs text-slate-500 mt-0.5">Highest 6h chance of rain</div>
                </div> -->

                <!-- when was it pulled? -->
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Model Run Time</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">
                        {formatInitializedAt(forecast.initialized_at)}
                    </div>
                    <div class="text-[11px] text-slate-500 mt-0.5">Source: NBM / MAWN Server</div>
                </div>

                <!-- PLAIN TEXT LINK -->
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">Legacy</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">
                        <a
                            href="https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/fous16{data.currentStation.code}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-xs bg-emerald-800 text-white hover:bg-msu-green hover:text-emerald-200"
                            title="View legacy text-only, viewable version of 60 forecast for {data.currentStation.code} (not Accessible)"
                        >
                            Formatted plain-text report &rarr;
                        </a>
                    </div>
                    <div class="text-[11px] text-slate-500 mt-0.5">MAWN Server</div>
                </div>

                <!-- JSON LINK -->
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div class="text-xs font-bold uppercase tracking-wider text-slate-500">API</div>
                    <div class="text-xs font-semibold text-slate-800 mt-1">
                        <a
                            href={`${base}/api/forecast-proxy.php?station=${data.currentStation.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-xs bg-emerald-800 text-white hover:bg-msu-green hover:text-emerald-200"
                            title="View raw JSON data returned from the site's PHP proxy"
                        >
                            View Data file (JSON format) &rarr;
                        </a>
                    </div>
                    <div class="text-[11px] text-slate-500 mt-0.5">PHP proxy / MAWN</div>
                </div>


            </div>

<!--        FORECAST headers -->
            <section aria-labelledby="forecast-table-heading" class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h2 id="forecast-table-heading" class="text-xl font-extrabold text-msu-dark">
                            60-Hour Forecast Table for {data.currentStation.name}
                        </h2>
                        <p class="text-xs text-slate-500 mt-0.5">
                            All times Michigan local (ET). Values derived from NBM model output.
                        </p>
                    </div>

                    <div class="flex items-center gap-2 sm:ml-auto">
                    <div id="show_csv_download_button" class="flex items-center gap-2">
                        <button
                            type="button"
                            onclick={handleDownloadCsv}
                            class="btn btn-xs btn-outline border-msu-green text-msu-green hover:bg-msu-green hover:text-white"
                            title="Download this forecast table as a CSV file"
                        >
                            Download CSV &rarr;
                        </button>
                    </div>
                    </div>
                </div>

                <!-- Responsive Table Wrapper -->
                <div class="overflow-x-auto">

<!-- -------------------------------------------------------- -->                    
                    <!-- ACTUAL TABLE -->
                    <table id="60-hour-forecast-table-{data.currentStation.code}" class="table table-xs table-zebra table-sm w-full text-left table-pin-rows table-pin-cols" aria-describedby="forecast-table-heading">
                        <caption class="sr-only">
                            60-hour detailed agricultural weather forecast for {data.currentStation.name} in 3-hour intervals
                        </caption>
                        <thead class="bg-slate-100 text-slate-800 text-xs font-bold border-b border-slate-300">
                            <tr>
                                <th scope="col" class="whitespace-normal">Date / Time (ET)</th> 
                                <th scope="col" class="whitespace-normal text-center">Temp 3H (°{forecast.units.temperature})</th> 
                                <th scope="col" class="whitespace-normal text-center">Min/Max temp (°{forecast.units.temperature})</th>	
                                <th scope="col" class="whitespace-normal text-center">Dew Pt (°{forecast.units.temperature})</th> 
                                <th scope="col" class="whitespace-normal text-center">RH (%)</th> 
                                <th scope="col" class="whitespace-normal ">Wind ({forecast.units.wind_speed})</th> 
                                <th scope="col" class="whitespace-normal ">Cloud Coverage (%)</th>  
                                <th scope="col" class="whitespace-normal text-center">6h Precip Probability</th> 
                                <th scope="col" class="whitespace-normal text-center">6h Precip Amount</th> 
                                <th scope="col" class="whitespace-normal text-center">6h T-storm Probability</th> 
                            </tr>
                        </thead>
                        <tbody class="text-xs divide-y divide-slate-200 font-medium text-slate-700">
                            {const currDate = ""}

                            {#each forecast.forecasts as entry, idx (entry.valid_at || idx)}
                                {@const { dateStr, timeStr } = formatDateTime(entry.valid_at)}
                                
                                <!-- ROW -->
                                <tr class="hover:bg-emerald-50/60 transition-colors" id="3hr-forecast-{dateStr}-{timeStr}">
                                    <!-- Valid Time -->
                                    <th scope="row" class="font-semibold text-slate-900 whitespace-nowrap py-2.5 px-3">
                                        {#if dateStr != currDate }
                                            <span class="block text-slate-900 font-bold">{dateStr}</span>
                                            {const currDate = dateStr}
                                        {/if}												
                                        <span class="text-[11px] text-slate-500">{timeStr}</span>
                                    </th>

                                    <!-- Temperature -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap font-bold text-slate-900">
                                        {#if entry.temperature !== null}
                                            <span class={entry.temperature <= 32 ? 'text-blue-700 font-extrabold' : entry.temperature >= 85 ? 'text-amber-700 font-extrabold' : 'text-slate-900'}>
                                                {Math.round(entry.temperature)}°
                                            </span>
                                        {:else}
                                            <span class="text-slate-400">—</span>
                                        {/if}
                                    </td>

                                    <!-- max_min_temperature_12h -->	
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap font-bold text-slate-900">
                                        {#if entry.max_min_temperature_12h !== null}
                                            <span class="text-slate-900">
                                                {Math.round(entry.max_min_temperature_12h)}°
                                            </span>
                                        {:else}
                                            <span class="text-slate-400">&nbsp;</span>
                                        {/if}
                                    </td>

                                    <!-- Dew Point -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap text-slate-600">
                                        {entry.dew_point !== null ? `${Math.round(entry.dew_point)}°` : '—'}
                                    </td>

                                    <!-- Relative Humidity -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap">
                                        {#if entry.relative_humidity !== null}
                                            <span class={entry.relative_humidity >= 85 ? 'font-bold text-emerald-800' : 'text-slate-600'}>
                                                {Math.round(entry.relative_humidity)}%
                                            </span>                                        
                                        {:else}
                                            <span class="text-slate-400">—</span>
                                        {/if}
                                    </td>

                                    <!-- Wind -->
                                    <td class="py-2.5 px-3 whitespace-nowrap font-mono text-xs">
                                        {#if entry.wind_speed !== null}
                                            <span class="font-semibold text-slate-800">
                                                {entry.wind_direction ?? ''} {Math.round(entry.wind_speed)}
                                            </span>
                                            <span class="text-[11px] text-slate-500">mph</span>
                                        {:else}
                                            <span class="text-slate-400">—</span>
                                        {/if}
                                    </td>

                                    <!-- Cloud Cover -->
                                    <td class="py-2.5 px-3 whitespace-nowrap">
                                        {#if entry.cloud_description}
                                            <span class="inline-block px-1.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                                                {entry.cloud_description}
                                            </span>
                                        {/if}
                                        {#if entry.cloud_cover !== null}
                                            <span class="text-slate-500 text-[11px] ml-1">
                                                ({Math.round(entry.cloud_cover)}%)
                                            </span>
                                        {/if}
                                    </td>

                                    <!-- 6h Precip Probability -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap font-semibold">
                                        {#if entry.precipitation_probability_6h !== null}
                                            {@const prob = Math.round(entry.precipitation_probability_6h)}
                                            <span class={prob >= 50 ? 'text-emerald-800 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded' : prob > 0 ? 'text-emerald-700' : 'text-slate-400'}>
                                                {prob}%
                                            </span>
                                        {:else}
                                            <span class="text-slate-700">—</span>
                                        {/if}
                                    </td>

                                    <!-- 6h Precip Amount -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap">
                                        {#if entry.precipitation_amount_6h !== null && entry.precipitation_amount_6h > 0}
                                            <span class="font-bold text-emerald-900">
                                                {entry.precipitation_amount_6h.toFixed(2)}"
                                            </span>
                                        {:else if entry.precipitation_amount_6h === 0}
                                            <span class="text-slate-400">0.00"</span>
                                        {:else}
                                            <span class="text-slate-700">—</span>
                                        {/if}
                                    </td>

                                    <!-- 6h Thunderstorm Probability -->
                                    <td class="py-2.5 px-2 text-center whitespace-nowrap">
                                        {#if entry.thunderstorm_probability_6h !== null && entry.thunderstorm_probability_6h > 0}
                                            <span class="text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                                                {Math.round(entry.thunderstorm_probability_6h)}%
                                            </span>
                                        {:else}
                                            <span class="text-slate-700">—</span>
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
<!-- -------------------------------------------------------- -->                    


                </div>

                <div class="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                    <span>
                        Data points: {forecast.forecasts.length} interval periods (~60 hours total)
                    </span>
                    <span>
                        Data server: <code class="font-mono bg-white px-1 py-0.5 border border-slate-200 rounded">https://mawn.geo.msu.edu/rawdata/legacy/fcsts/nbmnbs/data/</code>
                    </span>
                </div>
            </section>
        {/if}

        <!-- INFORMATION FOOTNOTE -->
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-xs text-slate-700 space-y-2">
            <h3 class="font-bold text-msu-dark text-sm">About the MAWN 60-Hour Forecast Products</h3>
            <p>
                These forecast data tables are powered by the National Weather Service's National Blend of Models (NBM/NBS), bias-corrected and localized for Michigan Automated Weather Network (MAWN) weather stations across Michigan.
            </p>
            <p>
                Because MAWN restricts cross-origin browser requests, this static site retrieves forecast JSON through the same-origin <code>api/forecast-proxy.php</code> script. The browser receives the result while no SvelteKit server is required after deployment.
            </p>
        </div>
    </div>
</div>
