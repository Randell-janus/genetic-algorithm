import React, { useContext, useState, createContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [genMembers, setGenMembers] = useState([]);

  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generateLetter = () => {
    const code = random(97, 123); // ASCII char codes
    return String.fromCharCode(code);
  };

  class Member {
    constructor(target) {
      this.target = target;
      this.keys = [];

      for (let i = 0; i < target.length; i += 1) {
        this.keys[i] = generateLetter();
      }
    }

    fitness() {
      let matches = 0;

      for (let i = 0; i < this.keys.length; i += 1) {
        if (this.keys[i] === this.target[i]) {
          matches += 1;
        }
      }

      return matches / this.target.length;
    }

    crossover(partner) {
      const { length } = this.target;
      const child = new Member(this.target);
      const midpoint = random(0, length);

      for (let i = 0; i < length; i += 1) {
        if (i > midpoint) {
          child.keys[i] = this.keys[i];
        } else {
          child.keys[i] = partner.keys[i];
        }
      }

      return child;
    }

    mutate(mutationRate) {
      for (let i = 0; i < this.keys.length; i += 1) {
        // If below predefined mutation rate,
        // generate a new random letter on this position.
        if (Math.random() < mutationRate) {
          this.keys[i] = generateLetter();
        }
      }
    }
  }

  class Population {
    constructor(size, target, mutationRate) {
      size = size || 1;
      this.members = [];
      this.mutationRate = mutationRate;
      this.target = target;

      for (let i = 0; i < size; i += 1) {
        this.members.push(new Member(target));
      }
    }

    evolve(generations) {
      const resultsList = [];
      const otherGensList = [];

      for (let i = 0; i < generations; i += 1) {
        const otherGens = this.members.map((m) => m.keys.join(""));
        const otherGensCount = otherGens.filter((w) => w === this.target);

        resultsList.push(otherGensCount.length);
        otherGensList.push(otherGens);

        setGenMembers(otherGensList);

        console.log(otherGens);
        console.log(
          `${otherGensCount ? otherGensCount.length : 0} member(s) typed "${
            this.target
          }"`
        );

        const pool = this._selectMembersForMating();
        this._reproduce(pool);
      }
      console.log(resultsList);
    }

    _selectMembersForMating() {
      const matingPool = [];

      this.members.forEach((m) => {
        // The fitter he/she is, the more often will be present in the mating pool
        // i.e. increasing the chances of selection
        // If fitness == 0, add just one member
        const f = Math.floor(m.fitness() * 100) || 1;

        for (let i = 0; i < f; i += 1) {
          matingPool.push(m);
        }
      });

      return matingPool;
    }

    _reproduce(matingPool) {
      for (let i = 0; i < this.members.length; i += 1) {
        // Pick 2 random members/parent from the mating pool
        const parentA = matingPool[random(0, matingPool.length)];
        const parentB = matingPool[random(0, matingPool.length)];

        // Perform crossover
        const child = parentA.crossover(parentB);

        // Perform mutation
        child.mutate(this.mutationRate);

        this.members[i] = child;
      }
    }
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Generations",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fitness Function Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [5, 6, 7, 8],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const value = { Population, options, data, genMembers, setGenMembers };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
