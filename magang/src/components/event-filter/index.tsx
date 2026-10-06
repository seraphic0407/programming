type EventFilterProps = {
  search: string;
  genre: string;
  date: string;
  genres: string[];
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onDateChange: (value: string) => void;
};

export const EventFilter = ({
  search,
  genre,
  date,
  genres,
  onSearchChange,
  onGenreChange,
  onDateChange,
}: EventFilterProps) => {
  return (
    <div className="event-filter">
      <input
        type="text"
        placeholder="Cari event..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        value={genre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="">Semua genre</option>

        {genres.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
      />
    </div>
  );
};
