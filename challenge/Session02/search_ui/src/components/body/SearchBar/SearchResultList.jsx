import { HistoryOutlined } from "@ant-design/icons";

export const SearchResultsList = ({ results, isSearchCompleted }) => {
  return (
    <div className="results-list">
      {isSearchCompleted &&
        results.map((result, id) => (
          <div key={id}>
            <span>
              <HistoryOutlined /> {result.name}
            </span>
            <br />
          </div>
        ))}
    </div>
  );
};
