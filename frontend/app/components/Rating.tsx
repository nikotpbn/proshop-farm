const Rating = ({ value, text }: { value: number; text: string }) => {
  return (
    <div className="rating flex flex-1 text-nowrap items-end gap-2 text-sm">
      <div className="stars text-yellow-500">
        <span>
          {value >= 1 ? (
            <span className="material-icons md-16">star</span>
          ) : value >= 0.5 ? (
            <span className="material-icons md-16">star_half</span>
          ) : (
            <span className="material-icons md-16">star_border</span>
          )}
        </span>

        <span>
          {value >= 2 ? (
            <span className="material-icons md-16">star</span>
          ) : value >= 1.5 ? (
            <span className="material-icons md-16">star_half</span>
          ) : (
            <span className="material-icons md-16">star_border</span>
          )}
        </span>

        <span>
          {value >= 3 ? (
            <span className="material-icons md-16">star</span>
          ) : value >= 2.5 ? (
            <span className="material-icons md-16">star_half</span>
          ) : (
            <span className="material-icons md-16">star_border</span>
          )}
        </span>

        <span>
          {value >= 4 ? (
            <span className="material-icons md-16">star</span>
          ) : value >= 3.5 ? (
            <span className="material-icons md-16">star_half</span>
          ) : (
            <span className="material-icons md-16">star_border</span>
          )}
        </span>

        <span>
          {value >= 5 ? (
            <span className="material-icons md-16">star</span>
          ) : value >= 4.5 ? (
            <span className="material-icons md-16">star_half</span>
          ) : (
            <span className="material-icons md-16">star_border</span>
          )}
        </span>
      </div>

      <span className="">{text && text}</span>
    </div>
  );
};

export default Rating;
