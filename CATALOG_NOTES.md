# Catalog annotations

The recovery dataset in `src/data/archivePosts.json` is kept unchanged: 360 records, August 2009 through January 2012 (8 / 45 / 305 / 2 records by year). Recovery work has not added any new original article bodies.

`src/data/catalogAnnotations.json` holds present-day browsing annotations, keyed by existing record slug:

- `artists` identifies names appearing in preserved titles, including featured performers and remixers, and normalizes spelling variants such as Jay Z / Jay-Z and Curreny / Curren$y. It also removes a previous false positive identifying “Current Rotation” as Curren$y and the split “The Creator” fragment. Generic playlists and site announcements remain unidentified.
- `genres` supplies editorial discovery tags. These can include multiple genres and are not claimed to be the original WordPress categories. The original category is retained on each catalog record page.

The artist directory and archive filters derive from the same annotated records so their counts agree. An artist count describes surviving records, never total historical coverage. Search covers titles and artist names, ignoring case and accents. Artist directory links use exact artist matching; free-text search remains broader.

Curated selections use the original record's title, month, category, and source when they overlap the recovered catalog. New retrospective notes and related listening selections are labeled separately. Some source links are tag pages or wildcard Wayback searches; their presence does not establish that a complete article or playable original embed survives.

The image gallery and uploads ledger are separate datasets. Nine image files are presented; 54 ledger rows retain their historical status labels (12 preserved, 42 uncached). Ledger status is not proof that a file is in the gallery.
