import Head from "next/head";
import SliderInput from "../components/SliderInput";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useAppContext } from "../components/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const {
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
    correctValsCount,
    mutationInputRate,
    setMutationInputRate,
    isLoading,
    setIsLoading,
  } = useAppContext();

  const [count, setCount] = useState(targetString.length);

  const handleGenerate = (
    e,
    populationSize,
    target,
    mutationRate,
    generations
  ) => {
    e.preventDefault();
    if (populationSize > 100 || !target.length || generations > 300) return;
    setIsLoading(true);
    const population = new Population(populationSize, target, mutationRate);
    population.evolve(generations);
    setIsLoading(false);
  };

  const handleGenerateOnMount = (
    populationSize,
    target,
    mutationRate,
    generations
  ) => {
    const population = new Population(populationSize, target, mutationRate);
    population.evolve(generations);
    setIsLoading(false);
  };

  const handleTextChange = (e) => {
    const target = e.target.value;
    const countValue = e.target.value.length;
    setTargetString(target.replace(/\s+/g, "").toLowerCase());
    setCount(countValue);
  };

  useEffect(() => {
    handleGenerateOnMount(
      populationSize,
      targetString,
      mutationInputRate,
      generationCount
    );
  }, []);

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Genetic Algorithm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* SIDEBAR */}
      <div className="bg-slate-100 w-80 px-9 py-24 hidden lg:block">
        <div className="space-y-8 fixed">
          <h3 className="font-semibold">Parameters</h3>
          <form
            className="space-y-8"
            onSubmit={(e) =>
              handleGenerate(
                e,
                Math.abs(populationSize),
                targetString,
                mutationInputRate,
                Math.abs(generationCount)
              )
            }
          >
            <div className="space-y-4">
              <p className="font-semibold">
                Target String{" "}
                <span className="font-normal">(letters only)</span>
              </p>
              <div className="relative">
                <input
                  className="input-outline"
                  required
                  maxLength="4"
                  type="text"
                  value={targetString}
                  onChange={handleTextChange}
                  disabled={isLoading}
                />
                <p className="absolute top-4 right-2 font-light text-slate-400">
                  Limit: {count}/4
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">
                Population Size{" "}
                <span className="font-normal">(min 20, max 100)</span>
              </p>
              <input
                className="input-outline"
                required
                type="number"
                min="20"
                max="100"
                value={populationSize}
                onChange={(e) => setPopulationSize(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-4">
              <p className="font-semibold">Mutation Rate</p>
              <select
                className="select-box"
                required
                value={mutationInputRate}
                onChange={(e) => setMutationInputRate(e.target.value)}
                disabled={isLoading}
              >
                <option value={0.01}>0.01</option>
                <option value={0.02}>0.02</option>
                <option value={0.03}>0.03</option>
                <option value={0.04}>0.04</option>
                <option value={0.05}>0.05</option>
              </select>
            </div>
            <div className="space-y-4">
              <p className="font-semibold">Generation Count</p>
              <SliderInput
                value={generationCount}
                min={50}
                max={300}
                onChange={(e) => setGenerationCount(e.target.value)}
              />
            </div>
            <button className="btn-primary" type="submit" disabled={isLoading}>
              Generate
            </button>
          </form>
        </div>
      </div>
      {/* MAIN-CONTAINER */}
      <div className="main-container">
        <h1 className="font-bold">Genetic Algorithm</h1>
        {/* table */}
        <div className="space-y-8">
          <h2 className="font-semibold">Evolutions Table</h2>
          <div className="overflow-auto h-96">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-center">Generation</th>
                  <th className="px-4 md:px-16 text-center">Fitness</th>
                  <th className="text-left">Population</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {genMembers.map((members, i) => (
                  <tr key={i}>
                    <td className="text-center p-4">{i + 1}</td>
                    <td className="text-center">{correctValsCount[i]}</td>
                    <td className="">{members.join("_")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* chart */}
        <div className="space-y-2">
          <h2 className="font-semibold">Fitness Value Chart</h2>
          <div className="">
            {/* <Bar options={options} data={data} /> */}
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
