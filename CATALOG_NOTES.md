# Catalog annotations

The recovery dataset in `src/data/archivePosts.json` is kept unchanged: 360 records, August 2009 through January 2012 (8 / 45 / 305 / 2 records by year). Recovery work has not added any new original article bodies.

`src/data/catalogAnnotations.json` holds present-day browsing annotations, keyed by existing record slug:

- `artists` identifies names appearing in preserved titles, including featured performers and remixers, and normalizes spelling variants such as Jay Z / Jay-Z and Curreny / Curren$y. It also removes a previous false positive identifying “Current Rotation” as Curren$y and the split “The Creator” fragment. Generic playlists and site announcements remain unidentified.
- `genres` supplies editorial discovery tags. These can include multiple genres and are not claimed to be the original WordPress categories. The original category is retained on each catalog record page.

The artist directory and archive filters derive from the same annotated records so their counts agree. An artist count describes surviving records, never total historical coverage. Search covers titles and artist names, ignoring case and accents. Artist directory links use exact artist matching; free-text search remains broader.

Catalog detail pages use the original record's title, month, category, and source when they overlap a curated selection. Discovery cards may describe earlier coverage supplied by the founders; links to later surviving records are labeled accordingly. New retrospective notes and related listening selections are labeled separately. Some source links are tag pages or wildcard Wayback searches; their presence does not establish that a complete article or playable original embed survives.

The image gallery and uploads ledger are separate datasets. Nine image files are presented; 54 ledger rows retain their historical status labels (12 preserved, 42 uncached). Ledger status is not proof that a file is in the gallery.

The homepage Mac Miller feature links to the Grog Shop story and its interview evidence. Its image is a frame at 00:04 from the existing `public/media/mac-miller-arroyo-grog-shop-citation.mp4`, labeled as an October 2011 interview still rather than a photograph of the August 21, 2010 show. The founders' booking role is confirmed by the site owner; the preserved interview supports the first out-of-town headlining show context. This feature does not add an article to the recovery dataset.

The Kid Cudi discovery card leads with the site owner's recollection that the first album reviews in 2009 covered Cudi's debut, *Man on the Moon*, and Jay-Z's *The Blueprint 3*. Those reviews predate the salvaged archive. The linked recovered record remains the October 2010 *Maniac* entry and is explicitly labeled as a later record; it does not date the start of Cudi coverage or imply that either original album review has been recovered.

The show date is August 21, 2010, corrected by the site owner with the live video title frame reading “Mac Miller Live @ The Grog Shop — 8/21/10.” The later Arroyo interview is supporting recollection, not the show date. The April 22, 2010 MGK interview took place four months before the show.
