export class Movie {
  Title = "The Avengers";
  Year = "2012";
  imdbID = "tt0848228";
  Type = "movie";
  Poster = "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg";
}

export class MovieDetail {
  Title = "The Purge: 2024";
  Year = "2017";
  Rated = "N/A";
  Released = "01 Nov 2017";
  Runtime = "14 min";
  Genre = "Short; Horror";
  Director = "Ashton Gleckman";
  Writer = "Ashton Gleckman";
  Actors = "Lec Zorn; Gabrielle Bousum; Paul Nicely";
  Plot = "A short fan film based on The Purge film franchise.";
  Language = "English";
  Country = "United States";
  Awards = "N/A";
  Poster = "https://m.media-amazon.com/images/M/MV5BZGRjOWUyM2EtNTMyNS00NTYyLTliMDctMDcwY2UxNGFmOTBjXkEyXkFqcGdeQXVyNjE0NzI3MTg@._V1_SX300.jpg";
  Ratings = [] as IRating[];
  Metascore = "N/A";
  imdbRating = "3.8";
  imdbVotes = "160";
  imdbID = "tt7553974";
  Type = "movie";
  DVD = "N/A";
  BoxOffice = "N/A";
  Production = "N/A";
  Website = "N/A";
  Response = "True"
}

export interface IRating {
  Source: string;
  Value: string;
}