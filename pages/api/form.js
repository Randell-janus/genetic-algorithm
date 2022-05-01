export default function handler(req, res) {
  const targetString = req.body.targetString;
  const populationSize = req.body.populationSize;
  const generationCount = req.body.generationCount;

  if (
    !targetString.length ||
    targetString.length > 4 ||
    populationSize > 200 ||
    populationSize < 20 ||
    generationCount < 50 ||
    generationCount > 300
  ) {
    return resolve();
  }
  res.status(200).json({ targetString, populationSize, generationCount });
}
