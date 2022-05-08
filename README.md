# Word Matching using Genetic Algorithm

Set a target word/string and see how each member of the population evolve to improve its fitness throughout generations.

- https://genetic-algorithm.vercel.app/

## About

The **genetic algorithm** is a type of optimization method that is inspired by Charles Darwin’s theory of natural evolution. This algorithm resembles natural selection, in which the fittest individuals are chosen for reproduction in order to create the succeeding generation's offspring. In the case of this project, the members are represented as strings and the traits of each member are its letters, and together will form a set of strings that will serve as a population. This project covers the important phases that are considered in a genetic algorithm:

1. **Initial population** - The first step is initializing the population which includes choosing a group of individuals with different traits. In the case of this project, a member is produced by generating random letters that form a string wherein its length is equal to the length of the input target string.
2. **Selection** - This involves determining the fitness of a member and using this fitness value to increase the chances of this member being selected for mating.
3. **Crossover** - This process involves mixing the traits of the selected fittest members of the current generation producing an offspring.
4. **Mutation** - This involves mutating the traits of the newly produced members with a low random probability to gain some randomness. In this case, the higher the mutation rate, the more chance of a trait being altered.

## Technologies Used

- This app is built with NextJS and TailwindCSS
- This project utilizes a serverless function to handle form validation

## Features

- Configure the target string to be matched
- Set the population size and number of generations
- Test out different mutation rate values
- Pick a desired type of chart

## Views

- Table Section
  - ![](https://github.com/Randell-janus/genetic-algorithm/blob/main/public/snapshots/table-view.JPG)
- Summary Section
  - ![](https://github.com/Randell-janus/genetic-algorithm/blob/main/public/snapshots/summary-view.JPG)
- Chart Section
  - ![](https://github.com/Randell-janus/genetic-algorithm/blob/main/public/snapshots/chart-view.JPG)
- Mobile View
  - ![](https://github.com/Randell-janus/genetic-algorithm/blob/main/public/snapshots/mobile-view.JPG)
