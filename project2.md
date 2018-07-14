---
layout: page
permalink: /project2/
---

Projects in this page are organized by **technology**.
- [Supervised Learning](#supervised-learning)
  - [Classification](#classification)
  - [Regression](#regression)
- [Unsupervised Learning](#unsupervised-learning)
  - [Clustering](#clustering)
  - [Recommendation](#recommendation)
- [Computer Vision](#computer-vision)
  - [Convolutional Neural Network](#convolutional-neural-network)
  - [Fully Convolutional Network](#fully-convolutional-network)
  - [MobileNet Single Shot Detection](#mobilenet-single-shot-detection)
  - [Object Detection API](#object-detection-api)
- [Hidden Markov Models](#hidden-markov-models)
- [Reinforcement Learning](#reinforcement-learning)
- [Recurrent Neural Network](#recurrent-neural-network)
- [Database](#database)
  - [SQL](#sql)
  - [NoSQL](#nosql)
- [Behavior Modeling](#behavior-modeling)
- [Visualization](#visualization)
- [Tools I use](#tools-i-use)

----
## Supervised Learning
### Classification
<a href="https://wzding.github.io/wzding.github.io/projects/Finding_Donors_for_Charity.html" target="_blank">**Finding Donors for Charity**</a> - utilized several supervised algorithms to accurately model individuals' income using data collected from the 1994 U.S. Census. We then chose the best candidate algorithm from preliminary results and further optimize this algorithm to best model the data.
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/stock_out_prediction.html" target="_blank">**Predicting Stock Out**</a> - used a variety of different supervised learning approaches (SVMs, KNNs, Decision Trees, Neural Networks) to predict stock out of products for a company, and ultimately found that a Nearest Neighbors model got the best accuracy of 99%. I used Numpy and Sklearn to help preprocess the data and create the models.
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/Titanic_Survival_Exploration.html" target="_blank">**Titanic Survival Exploration**</a> - The project revolved around taking in a dataset of all the passengers in the Titanic disaster, which includes data such as age, gender, ticket price and etc. to predict whether or not they survived. 
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/Vehicle_Detection.html" target="_blank">**Vehicle Detection I**</a> - performed a Histogram of Oriented Gradients (HOG) feature extraction on a labeled training set of images and train a classifier Linear SVM classifier to detect vehicles on the road in a video from a front-facing camera on a car.

### Regression
<a href="https://wzding.github.io/wzding.github.io/projects/Boston_Housing.html" target="_blank">**Analyzing Boston Housing**</a> - predicted house price in suburbs of Boston, Massachusetts by leveraging the data of a house, such as the average number of rooms among homes in the neighborhood, the percentage of homeowners in the neighborhood considered "lower class" (working poor) and the ratio of students to teachers in primary and secondary schools in the neighborhood.
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/LightningstrikeInducedOutages.pdf" target="_blank">**Lightning strike Induced Outages**</a> - This research analyzed lightning strikes and weather conditions, and investigated how lighting-induced outages of airport infrastructure and facilities impacted airports' performance from an economic perspective.

----
## Unsupervised Learning
### Clustering
<a href="https://wzding.github.io/wzding.github.io/projects/Customer_Segments.html" target="_blank">**Customer Segmentation**</a> - this project was to best describe the variation in different types of customers that a wholesale distributor interacted with by analyzing customers' annual spending amounts on diverse product categories.
### Recommendation
<a href="https://wzding.github.io/wzding.github.io/projects/Select_Genre_of_Next_Movie.html" target="_blank">**Select Genre of Next Movie**</a> - to pick the genre of our studio’s next movie using the dataset of IMDB movie ratings. I came up with two metrics to evaluate the popularity and reputation of a movie in a cerain genre which guide us to make recommendations.

----
## Computer Vision
<a href="https://wzding.github.io/wzding.github.io/projects/Advanced-Lane-Finding.html" target="_blank">**Detecting Lane Lines I**</a> - detected lane lines on a highway by creating thresholded binary image as well as calculated curvature and vehicle's position in a video by fitting 2nd order polynomial functions.
### Convolutional Neural Network
<a href="https://wzding.github.io/wzding.github.io/projects/Dog_Identification_App.html" target="_blank">**Developing A Dog Identification App**</a> - aimed at developing an algorithm that could accept any user-supplied image as input. If a dog is detected in the image, it would provide an estimate of the dog's breed. If a human is detected, it would provide an estimate of the dog breed that is most resembling.
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/Traffic_Sign_Classifier.html" target="_blank">**Traffic Sign Recognition**</a> - used LeNet architecture to train a CNN to recognize traffic signs. 
### Fully Convolutional Network
<a href="https://wzding.github.io/wzding.github.io/projects/Semantic_Segmentation.html" target="_blank">**Detecting Lane Lines II**</a> - used Fully Convolutional Network to identify free space on the road in a video clip.
### MobileNet Single Shot Detection
<a href="https://wzding.github.io/wzding.github.io/projects/Object_Detection_MobileNets_SSD.html" target="_blank">**Vehicle Detection II**</a> - used MobileNets separable depthwise convolutions and Single Shot Detection (SSD) to build a pipeline to detect cars, people, bikes in a image.
### Object Detection API
<a href="https://wzding.github.io/wzding.github.io/projects/Traffic_Light_Detection_and_Classification.html" target="_blank">**Traffic Light Detection and Classification**</a> - used Google Tensorflow Object Detection API to train a classifier to detect and classify traffic light in videos.

----
## Hidden Markov Models 
<a href="https://wzding.github.io/wzding.github.io/projects/Sign-Language-Recognition-System.html" target="_blank">**Sign Language Recognition System**</a> - employed hidden Markov models (HMM's) to analyze a series of measurements taken from videos of American Sign Language (ASL) collected for research.

----
## Reinforcement Learning
<a href="" target="_blank">**Train a Smartcab to Drive**</a> - applied reinforcement learning techniques for a self-driving agent in a simplified world to aid it in effectively reaching its destinations in the allotted time.

----
## Recurrent Neural Network
<a href="https://wzding.github.io/wzding.github.io/projects/Time_Series_Prediction.html" target="_blank">**Predicting Stock Price**</a> - used a Recurrent Neural Network regressor to forecast stock prices 7 years in advance.
<br><br><a href="https://wzding.github.io/wzding.github.io/projects/Text_Generation.html" target="_blank">**Create A Text Generator**</a> - used a Recurrent Neural Network (RNN) architecture to create an English language sequence generator capable of building semi-coherent English sentences from scratch by building them up character-by-character. 

----
## Database
### SQL
<a href="https://wzding.github.io/wzding.github.io/projects/Wrangle_OpenStreetMap.html" target="_blank">**Wrangle Open Street Map Data**</a> - I selected San Diego, CA, United States in [Open Street Map](https://www.openstreetmap.org) and used data munging techniques, such as assessing the quality of the data for validity, accuracy, completeness, consistency and uniformity, to clean the raw data. I used SQL as the data schema to complete the project.
### NoSQL

----
## Behavior Modeling
<a href="https://wzding.github.io/wzding.github.io/projects/AirlinesScheduleBlockTimeAdjustmentBehavior.pdf" target="_blank">**A Study on Airlines’ Schedule Block Time Adjustment Behavior**</a> - built discrete choice models to identify factors that affect airlines’ schedule block time (the yearly time differences of scheduled departure times and arrival times) and quantify their impacts.

----
## Visualization
<a href="https://shortage.herokuapp.com/shortage" target="_blank">**Visualizing Impact of Component Shortage on Finished Goods**</a> - created a dashboard using [Bokeh](https://bokeh.pydata.org/en/latest/) and [Heroku](https://dashboard.heroku.com/) to visualize monetary loss of finished goods due to shortage of certain component/components. Please note that it may take some time to load the website cause I used a free-tier Heroku account to deploy the app.

----
## Tools I use
* Language: Python, R, scala, C++ 
* Database: MySQL, MongoDB
* Data Analysis: pandas, numpy, sklearn
* Big Data: Hadoop, Spark
* Deep Learning: tenforflow, Keras
* Data Visualization: D3.js, Shiny, Tableau
* Spatial Analytics: ArcGIS, QGIS
