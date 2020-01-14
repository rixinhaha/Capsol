## Capsol
A smart pill-box we created for IDEAHACKS 2020 @ UCLA. 

Check out our devpost link : https://devpost.com/software/capsol \n
Our demo: https://www.youtube.com/watch?v=29arU1M8RJE

## Inspiration
We're college students! The hustle and bustle of college can be trying and often overwhelming. We live hectic lives with haphazard schedules - things occasionally slip our mind. How many of us have at some point, forgotten even to eat (perhaps even during this very hackathon)? 

Meet Capsol, a smart pillbox with an accompanying mobile app that helps us keep track of our medication or nutritional schedules, alerting us with notifications on our mobile phones, and bright lights and prompts on our pillbox.

## What it does
A user inputs his dietary or medication schedule onto the mobile application, which keeps track and notifies the user when it's time to consume a food item in a pillbox. Each of the 4 pillboxes can be set with different food items with different time intervals for consumption. When it's time, the user receives a notification on their phone. At the same time, an LED bulb right above the correct pillbox will light up, and an LCD screen will also instruct the user on the amount of medication/food to consume. These switch off once the user closes the notification.

## How we built it
For our pillbox, we made use of Solidworks to 3D print the structure. We made use of Arduino Nano, HC-05 Bluetooth modules, an LCD screen, and 4 LED lights. 

We built the mobile application using react-native, relying on crucial libraries such as react-native-bluetooth-serial which enabled us to make Bluetooth communications. We also used various UI kits to enhance user-friendliness.

## Challenges we ran into
At one point, we tried to rename our app and used a deprecated library to do so. As a result, our app crashed and we had to rebuild it in another react-native-project. 
We also found that react-native had poor library support (with many issues of deprecation) which added to the difficulty of developing an easy-to-use mobile application.

## Accomplishments that we're proud of
We developed something to (relative) completion!
We believe that while our idea and product are simple, it has immense potential to help many in their daily lives, and has great room to grow (i.e. future improvements can go a long way to develop this).

We're also a team of rather diverse interests and played to our strengths in this competition, with regards to 3D printing, soldering, embedded system programming, and mobile app development.

## What we learned
We learned lots! Many of us learned a new skill in the course of the project - new frameworks, design principles, unit testing. 

## What's next for Capsol
Pillbox:
1. Have a built-in speaker to whine at users for during alerts.
2. Have built-in WiFi capabilities as another mode of communication with the pillbox.
3. Have a lid sensor to monitor when a pillbox is opened - to ensure the user actually consumed the food!
4. Modularity of individual pillboxes, such that more pillboxes can be added to the same primary pillbox. Perhaps with different colors it can enhance a user's experience and make it more fun to use.

Mobile App:
1. Greater customization of interval times
2. Allow for the management of multiple pillboxes (should users own more than one?).
