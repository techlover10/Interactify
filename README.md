# Roku Interactive Advertising Framework 

# Installation and Usage

## Important: All devices must be connected to the same wireless network in order to connect successfully.

## Common Directions
- Step 0: Install [nodejs](https://nodejs.org/en/)
- Step 1: Clone the repository into your directory of choice.
- Step 2: Enter the root directory of the source repository and run the command `npm install`
- Step 3: Run the command `npm start` within the root directory
- Step 4: From the computer (or the TV screen) navigate to http://localhost:3000/tv
- Step 5: Find the IP address (denoted as `ipaddr`) of your localhost (operating system specific)
- Step 6: From the phone, navigate to `ipaddr:3000/remote`
- Step 7: From another device, navigate to the admin panel.  If you are opening the admin panel on the computer, this can be accomplished with `localhost:3000/admin`.  If on a mobile device, this can be accomplished by navigating to `ipaddr:3000/admin`.  

## Windows
- Step 5: To obtain the IP address, click the Wi-Fi button in the taskbar, where you select your wireless networks.  Click on the currently selected network, and click the "Properties" button.  Scroll to the bottom of the settings screen, and take note of the IPv4 address.  This will be your `ipaddr`.

## Mac/Linux
- Step 5: To obtain the IP address, enter a terminal and run `ifconfig`.  Find the wireless IP address of your device, typically listed under `wlp2s0`.

## Open-Source Credits
Starting code + inspiration from [secondDeal](https://github.com/aliu139/secondDeal) by
by [Austin Liu](https://github.com/aliu139)

Our goal was to use the second screen as an advertising platform in a non-intrusive way.  The idea of voluntarily "taking" an ad from the screen was inspired by this open-source project.  Much of the original server implementation for the prototype in this repository is based off of a heavily modified version of secondDeal.  Ultimately, as our prototype develops and becomes richer, much of the starting codebase will be stripped and repurposed in order to better serve the needs of our advertising platform.

## Introduction
### Background and Development
To redesign the advertisement experience for ROKU users, our team was focusing on how to take advantage of ROKU’s data collection. For our first wedge, we were designing a new real-time dynamic advertisement panel. The idea was to create a platform for advertisers to adjust their advertising content according to the reaction of ROKU users. However, it seemed like a rather expensive and infeasible system to build and it might require many back-end implements on the ROKU end.

We were still struggling with the idea of dynamic advertisement until the first sketch section, when we came up with two prototypical ideas: 1. Dual Screen Interaction, and 2. Point Of Sale. They were by far the more actionable ideas after our talking to our ROKU company advisors, Dan, Jake, Tommy. To implement dual screen interaction, we can take advantage of the ROKU remote on the mobile app, which has basic features such as remote control and a search function. For point of sale, ROKU is attempting and willing to try out a new advertising format. Advisors of ROKU were also interested in the voice-recognition system for point of sale, but our team opted for the dual screen because not only does it offer maximum flexibility, but it also lets us take advantage of point of sale, promos, downloads, and other mediums.

### Our Plan
In essence, our plan is to enhance advertisement experience for users leveraging the second screen. Our reasoning is that, since TV experience is becoming more of a combination between TV and Mobile end, it is better if we can make users interact with us on the ROKU app. This interaction not only creates more dimensionalities of data to run analysis on, but also create better user experience. Advertisers can put their existing advertisement into new formats, like sprite display (as well as existing tv formats), something we looked at and experimented with by looking at the top advertisements of 2016. 

In conclusion, we have come up with the idea to enhance advertisement interaction by using second screen as the medium. We also experimented with the specific formats of different categories of ads.

