import Head from "next/head";
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
import { useAppContext } from "../src/context";
import {
  FormLayout,
  SliderInput,
  RadioButton,
  InputBox,
  SelectBox,
  Overlay,
  MobileNavbar,
  MobileNavbarToggler,
} from "../src/components";
import { GithubLink, ThemeSwitcher, SidebarCloseBtn } from "../src/icons";

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

const Home = () => {
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
    mutationRate,
    setMutationRate,
    chartDataY,
    loading,
    setLoading,
    navIsOpen,
  } = useAppContext();

  const [count, setCount] = useState(targetString.length);
  const [chartType, setChartType] = useState("line");

  const [resultsGenerationCount, setResultsGenerationCount] =
    useState(generationCount);
  const [resultsTargetString, setResultsTargetString] = useState(targetString);
  const [resultsPopulationSize, setResultsPopulationSize] =
    useState(populationSize);
  const [resultsMutationRate, setResultsMutationRate] = useState(mutationRate);

  const handleGenerate = (
    populationSize,
    targetString,
    mutationRate,
    generationCount
  ) => {
    const population = new Population(
      populationSize,
      targetString,
      mutationRate
    );
    population.evolve(generationCount);
    setResultsGenerationCount(generationCount);
    setResultsTargetString(targetString);
    setResultsPopulationSize(populationSize);
    setResultsMutationRate(mutationRate);
    setLoading(false);
  };

  const handleGenerateOnMount = (
    populationSize,
    targetString,
    mutationRate,
    generationCount
  ) => {
    const population = new Population(
      populationSize,
      targetString,
      mutationRate
    );
    population.evolve(generationCount);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      targetString,
      populationSize,
      generationCount,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/form";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    if (response.status !== 200) {
      setLoading(false);
      return;
    }
    const result = await response.json();
    // console.log(`${response.status}`);
    // console.log(result.targetString);
    handleGenerate(
      result.populationSize,
      result.targetString,
      mutationRate,
      result.generationCount
    );
  };

  const handleTextChange = (e) => {
    const target = e.target.value.replace(/\s+/g, "");
    const countValue = target.length;
    setTargetString(target.toLowerCase());
    setCount(countValue);
  };

  useEffect(() => {
    handleGenerateOnMount(
      populationSize,
      targetString,
      mutationRate,
      generationCount
    );
  }, []);
  return (
    <div className="min-h-screen lg:flex relative lg:pl-80 dark:bg-slate-800">
      <Head>
        <title>Word Matching - Genetic Algorithm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Overlay />
      <MobileNavbar />
      <MobileNavbarToggler />

      {/* SIDEBAR */}
      <nav
        className={`${
          navIsOpen === true ? "translate-x-0" : "-translate-x-full"
        } side-container`}
      >
        <SidebarCloseBtn />
        <ThemeSwitcher className="border-slate-100 dark:border-slate-900 absolute top-2 left-2" />
        <GithubLink className="border-slate-100 dark:border-slate-900 absolute bottom-2 right-2 hidden lg:block" />

        <div className="space-y-8 w-full px-4 sm:px-6">
          <h3 className="font-semibold">Settings</h3>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <FormLayout inputLabel="Target String" condition="(letters only)">
              <div className="relative">
                <InputBox
                  type="text"
                  maxLength="10"
                  value={targetString}
                  onChange={handleTextChange}
                />
                <p className="absolute top-4 right-2 font-light text-slate-400">
                  Limit: {count}/10
                </p>
              </div>
            </FormLayout>
            <FormLayout
              inputLabel="Population Size"
              condition={`: ${populationSize}`}
            >
              <SliderInput
                value={populationSize}
                min={20}
                max={200}
                step={5}
                onChange={(e) => setPopulationSize(e.target.value)}
              />
            </FormLayout>
            <FormLayout
              inputLabel="Generation Count"
              condition={`: ${generationCount}`}
            >
              <SliderInput
                value={generationCount}
                min={50}
                max={300}
                step={10}
                onChange={(e) => setGenerationCount(e.target.value)}
              />
            </FormLayout>
            <FormLayout inputLabel="Mutation Rate">
              <SelectBox
                value={mutationRate}
                onChange={(e) => setMutationRate(e.target.value)}
              />
            </FormLayout>
            <FormLayout inputLabel="Chart Type">
              <div
                onChange={(e) => setChartType(e.target.value)}
                className="space-x-8"
              >
                <RadioButton label="Line" value="line" chartType={chartType} />
                <RadioButton label="Bar" value="bar" chartType={chartType} />
              </div>
            </FormLayout>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Generating" : "Generate"}
            </button>
          </form>
        </div>
      </nav>
      {/* MAIN-CONTAINER */}
      <div className="main-container overflow-auto">
        <div className="space-y-4">
          <h1 className="font-bold">Genetic Algorithm</h1>
          <p>
            Set a target string and see how each member of the population evolve
            to improve its fitness throughout generations.
          </p>
        </div>
        {/* TABLE SECTION */}
        <div className="space-y-6">
          <h2 className="font-semibold">Evolutions Table</h2>
          <div className="overflow-auto h-96 table-scrollbar">
            <table className="">
              <thead>
                <tr>
                  <th className="text-center">Generation</th>
                  <th className="px-4 md:px-16 text-center">Matches</th>
                  <th className="text-left">Population</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-700">
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
        {/* SUMMARY SECTION */}
        <div className="space-y-6">
          <h2 className="font-semibold">Summary</h2>
          <div className="bg-slate-100 dark:bg-slate-900 rounded font-mono leading-8 p-8 overflow-auto">
            Summary = &#123;
            <br />
            &nbsp;&nbsp;configuration: &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;targetString: &quot;{resultsTargetString}
            &quot;,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;populationSize: {resultsPopulationSize},
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;mutationRate: {resultsMutationRate},
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;totalGenerations: {resultsGenerationCount},
            <br />
            &nbsp;&nbsp;&#125;,
            <br />
            &nbsp;&nbsp;results: &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;matchingStringsCount:{" "}
            {chartDataY[chartDataY.length - 1]},
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;bestRecorded: &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchingStringsCount:{" "}
            {Math.max(...chartDataY)}
            ,
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;atGeneration:{" "}
            {chartDataY.indexOf(Math.max(...chartDataY)) + 1},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;,
            <br />
            &nbsp;&nbsp;&#125;,
            <br />
            &#125;
          </div>
        </div>
        {/* CHART SECTION */}
        <div className="space-y-4">
          <h2 className="font-semibold">Match Count Chart</h2>
          <div>
            {chartType === "line" ? (
              <Line options={options} data={data} />
            ) : (
              <Bar options={options} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
