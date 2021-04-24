

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://uht-public.vertoengage.com/engage/generic-open-clinic?key=b6f65518-d5bc-4113-b7ed-ee33f7574929">
    <img src="https://pokeoneguide.com/wp-content/uploads/elementor/thumbs/masterball-nve2ioa57xvw13gucy6gnneioo23be6vg0ir3g0ptk.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Vaccine Availability Helper</h3>

  <p align="center">
   A script to check slots left on Verto Health booking website
  </p>
</p>

## About the script

Instead of clicking over the dates in calendar to check vaccine avaibility one by one, it tells you number of spots left periodically and alerts when spots are found.


## Notes

- The script was built for cheking vaccine availability on Toronto WCC/RPV [vaccine booking website](https://uht-public.vertoengage.com/engage/generic-open-clinic?key=b6f65518-d5bc-4113-b7ed-ee33f7574929), it **does not book any appointments**.

- It checks availability every 15 seconds by default, interval could be changed by modifying `check_interval`

- When spots are found, it prints location, date and number of spots left in red and makes this [sound](https://freesound.org/data/previews/80/80921_1022651-lq.mp3)

- It may fail to make the sound if you never interact with webistes (see [chrome policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)), messages will still be printed.

- It may stop working because of CloudFlare DDOS protection, when you see the error in console, please refresh.

- The script could work for other similar Verto Health booking websites by modifing some constants, please feel free to update constants(locations, type, domain, key) or modify code based on your needs.



## How to use?


### Prerequisites

A browser supporting [Tempermonkey](https://www.tampermonkey.net) or any userscript tool (Chrome/Firefox/...)

### Setup

1. Install Tempermonkey or any userscript tool
2. Create a new script, copy the code in [vaccine_hunter.js](https://github.com/ytaminE/vaccine-slot-monitor/blob/main/vaccine_hunter.js) and enable it.
3. Go to the vaccine booking [website](https://uht-public.vertoengage.com/engage/generic-open-clinic?key=b6f65518-d5bc-4113-b7ed-ee33f7574929)
4. Open your browser's developer console and start hunting



### Screenshot

![image](https://user-images.githubusercontent.com/15852706/115940883-27261900-a471-11eb-9688-fdd42e5c8350.png)


![image](https://user-images.githubusercontent.com/15852706/115942146-c00b6300-a476-11eb-982f-41b7728e9713.png)

(Numbers are automatically generated)


