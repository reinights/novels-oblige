# Novels Oblige

Novels Oblige is a web novel platform that harnesses some functionality of the browser. The website will include an editor that allows all users to publish their own novels and chapters. Furthermore, the novels will include functionality for non-linearity that allows users to make choices that affect how the story will unfold.

Additionally, I want to add trigger "pages" in which a specific audio will play that the author can choose.

(Tentative) The creative side will be on an alternative status displayer. Normally, this would be a text-only tracker, but users can choose to view their collections in a "garden" where starting a novel plants a seed and as they read through it grows into a tree on completion.

As an extension, I want the platform to provide a more richer reading experience with web technologies such as advanced media placements, animations, and rendering technologies

## Features

- [ ] User registration and logins
- [ ] User profile pages
- [ ] Basic novel editor and reader
- [ ] User novel status tracker/display
- [ ] Comment section on novels and chapters
- [ ] Follow novel/author and notifications
- [ ] Non-linear and multiple ending for novels
- [ ] Currency system to unlock latest chapters
- [ ] Daily missions to get currency
- [ ] Trigger pages to play audio

### Extension

- [ ] Advanced novel editor and reader (styling, media placements, ad placements, animation, and audio)
- [ ] Twine support

### Considerations

- [ ] AI-voice reader for accessbility.
- [ ] Garden view for status tracking.

## Tech Stack

### MongoDB

- Storing user data (credentials, reading status, currency)
- Novel data (statistics, tags/genres, reviews)
- Storing chapter data from page editor
- Comments

### Express.js + Node.js

- Setting API endpoints for novel interactions (uploading, liking, reviewing, commenting)
- Handling user sessions
- Handling authentications


### React

- Dynamic and conditional element rendering
- Reusable elements and UI with components.
- State management.
- Importing external libraries.


### Next.js

- Chapter static site generator
- Chapter server side rendering

### Playwright

- Automated testing
- Cross-browser testing

## Data Needs

### User

- User credentials (password, email)
- User information (username, DOB)
- Followed novels and authors 
- Novel statuses (reading, stalled, dropped, completed, and plan to read)
- Mission progress

### Novel

- Novel data (cover, description, chapter list)
- Novel and chapter metadata
- Tags and Genre
- Novel comments
- Chapter comments

### Analytics

- Novel visit count
- Novel, chapter, and comment likes

## User Considerations

Here are my predictions and assumptions of what my userbase would make up of.

### Web Novel Readers

- Most of my userbase could be already familiar with what a web novel is, possibly seeking out new experiences in this medium.

##### Actions

- Making the user experience centred around how users are able to access the novels, where the novels themselves will hog all of the aesthetics.

### Predominantly Mobile Users

- Not only does the web traffic from mobile devices make up more than 50%, reading from a mobile phone is an accessible and convienient way to consume media.

##### Actions

- Focusing on smooth and seamless responsive experiences
- Prioritising user experience rather than visual design

### Ages 14-40

- Web novels typically make up of people who are very familiar with the internet and those who are familiar with technology. 
- Genre diversity could also play in demographics in terms of gender.

##### Actions

- Following modern standards and expectations with this generation of users when it comes to design and experience.
