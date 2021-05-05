// ==UserScript==
// @name         Vaccine Hunter V1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Check slots avaiability in Verto Health booking system
// @author       bulibuli
// @match        https://uht-public.vertoengage.com/engage/generic-open-clinic?key=b6f65518-d5bc-4113-b7ed-ee33f7574929*
// @icon         https://www.clipartmax.com/png/middle/251-2515350_awesome-pokemon-pictures-free-download-pikachu-icon-pikachu-png-icon.png
// @grant        none
// ==/UserScript==

// Please change @match to the website you are visiting

(function() {
    'use strict';

    {

        // -----------------------Constants----------------------

        const audio = new Audio("https://freesound.org/data/previews/80/80921_1022651-lq.mp3")
        audio.loop = false

        const key = 'b6f65518-d5bc-4113-b7ed-ee33f7574929'
        const domain = 'https://uht-public.vertoengage.com/engage/api/api/cac-open-clinic/v1/slots/availability'
        const locations = ['WCC', 'RPV', 'RUV']
        const type = 'Communities'

        const check_interval = 15 * 1000 // milliseconds
        const refresh_interval = 545 * 1000 // milliseconds
        const number_of_days = 8 // days


        // -----------------------Main---------------------------

        start()

        // Check availability periodically
        const intervalId = setInterval(function() {
            start()
        }, check_interval)

        // Refresh page periodically
        // const refreshId = setTimeout(function() {
        //     location.reload()
        // }, refresh_interval)

        console.debug('READY')


        // -----------------------Methods------------------------

        async function getAvailability(url_key, url) {
            return fetch(url).then((response) => {
                return response.json()
            }).then((json_response) => {
                const slots_left = json_response.slots_left

                if(slots_left > 0) {
                    console.debug(url_key, slots_left);
                }

                return {
                    url_key,
                    slots_left
                }
            })
        }

        async function start() {

            const dates = Array.from(Array(number_of_days).keys()).map(days => {
                const date = new Date();
                date.setDate((new Date()).getDate() + days)
                return date.toISOString().split('T')[0]
            })

            const urls = {}
            dates.forEach(date => {
                locations.forEach(location => {
                    const url_key = `${location}-${date}`
                    const url = `${domain}?day=${date}T00:00:00.000-04:00&location_id=${location}&slot_type=${type}&key=${key}`
                    urls[url_key] = url
                })
            })

            const total = []
            for (const [key, value] of Object.entries(urls)) {
                const availability = await getAvailability(key, value)
                total.push(availability)
            }
            total.sort(compare)

            console.debug('-----------COMPLETE------------')

            if(total.filter(hash => hash.slots_left > 0).length == 0) {
                console.log(`%cThere are no slots left at ${new Date().toLocaleTimeString()}`, 'font-size: 20px; color: green')
            } else {
                audio.play()
                console.log(`%cSLOTS FOUND`, 'font-size: 20px; color: blue')
            }

            total.filter(hash => hash.slots_left > 0).forEach(hash => {
                console.log(`%c ${hash.url_key} ${hash.slots_left}`, 'font-size: 40px; color: red')
            })
        }

        function compare( a, b ) {
            if ( a.slots_left < b.slots_left ){
                return 1
            }
            if ( a.slots_left > b.slots_left ){
                return -1
            }
            return 0
        }
    }
})();