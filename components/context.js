import React, { useContext, useState, createContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [genMembers, setGenMembers] = useState([]);
  const [chartDataY, setChartDataY] = useState([]);
  const [chartDataX, setChartDataX] = useState([]);

  const [targetString, setTargetString] = useState("xxyyzz");
  const [populationSize, setPopulationSize] = useState(150);
  const [mutationRate, setMutationRate] = useState(0.01);
  const [generationCount, setGenerationCount] = useState(100);

  const [correctValsCount, setCorrectValsCount] = useState([]);

  const [loading, setLoading] = useState(true);

  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  };

  const generateLetter = () => {
    const code = random(97, 123);
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
      const correctValueList = [];

      for (let i = 0; i < generations; i += 1) {
        const otherGens = this.members.map((m) => m.keys.join(""));
        const otherGensCount = otherGens.filter((w) => w === this.target);

        resultsList.push(otherGensCount.length);
        otherGensList.push(otherGens);
        correctValueList.push(otherGensCount.length);

        setGenMembers(otherGensList);
        setCorrectValsCount(correctValueList);

        // console.log(otherGens);
        // console.log(
        //   `${otherGensCount ? otherGensCount.length : 0} member(s) typed "${
        //     this.target
        //   }"`
        // );

        const pool = this._selectMembersForMating();
        this._reproduce(pool);
      }

      setChartDataY(resultsList);
      setChartDataX(resultsList.map((results, i) => i + 1));

      // console.log(resultsList);
      // console.log(`this is last item: ${resultsList[resultsList.length - 1]}`);
      // console.log(resultsList.length);
      // console.log(resultsList.map((results, i) => i + 1));
    }

    _selectMembersForMating() {
      const matingPool = [];

      this.members.forEach((m) => {
        const f = Math.floor(m.fitness() * 100) || 1;

        for (let i = 0; i < f; i += 1) {
          matingPool.push(m);
        }
      });

      return matingPool;
    }

    _reproduce(matingPool) {
      for (let i = 0; i < this.members.length; i += 1) {
        const parentA = matingPool[random(0, matingPool.length)];
        const parentB = matingPool[random(0, matingPool.length)];
        const child = parentA.crossover(parentB);

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
    },
  };
  const labels = chartDataX;

  const data = {
    labels,
    datasets: [
      {
        label: "Fitness Value",
        data: chartDataY,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const value = {
    Population,
    options,
    data,
    genMembers,
    targetString,
    setTargetString,
    populationSize,
    setPopulationSize,
    generationCount,
    setGenerationCount,
    chartDataY,
    correctValsCount,
    mutationRate,
    setMutationRate,
    loading,
    setLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
