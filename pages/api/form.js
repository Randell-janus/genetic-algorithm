export default async function handler(req, res) {
  const targetString = req.body.targetString;
  const populationSize = req.body.populationSize;
  const generationCount = req.body.generationCount;

  if (
    targetString.length > 0 &&
    targetString.length <= 10 &&
    populationSize <= 200 &&
    populationSize >= 20 &&
    generationCount >= 50 &&
    generationCount <= 300
  ) {
    return res
      .status(200)
      .json({ targetString, populationSize, generationCount });
  }
  // return res.status(200).json({
  //   targetString: targetString.substring(0, 4),
  //   populationSize: 100,
  //   generationCount: 50,
  // });
  return res.status(400).json({});
}
