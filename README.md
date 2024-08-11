# Staging Ground for the Williams Computer Science Department Webpage

This repository provides code for updating and deploying the homepage for the Williams College Computer Science Department.


## Adding content

To make the webpage easier to update and maintain, much of the content is separated from the Javascript code. Here's how to add various types of content to the webpage:

### Adding a person to the About Us page:

1. Put a square photo (any format, but typically JPG or PNG) of the person in the `deptpage/images/people/` directory.

2. Add a new item to the `people` field of `deptpage/data/people.json`. Here is an example:

```
{
    "id": "Mark Hopkins",
    "photo": "images/people/mark.jpg",
    "role": "faculty",
    "title": "Assistant Professor",
    "webpage": "https://markandrewhopkins.com/",
    "interests": "Machine learning, machine translation, low-resource natural language processing"  
}
```

The id is just the person's name. The role should be ```faculty```, ```staff```, or ```emeriti```. You can omit the webpage field or interests field if not applicable. All other fields are mandatory. All paths are relative to the `deptpage` directory.


### Adding a course offering to the Courses page:

1. Add a new item to the `sections` field of `deptpage/data/courses.json`. Here is an example:

```
{
    "id": "f24-csci136-2",
    "course": "CSCI 136",
    "semester": "Fall 2024",
    "instructors": [
        "James Bern"
    ],
    "lecture": "MWF 10-1050am",
    "webpage": "https://catalog.williams.edu/CSCI/detail/?strm=1253&cn=136&crsid=010803"
}
```

The ids of all articles should be unique (one way to do this is to follow the format "semester-course-section", as above). The `course` field should match one of the course ids in the `catalog` field of `deptpage/data/courses.json` (see the next step for how to add new courses). The `instructors` field is a list of the instructors for that section. All fields are mandatory, including the `webpage` field (typically this should be the official course homepage, but if that doesn't exist, then just use the Williams Catalog page for that section). All paths are relative to the `deptpage` directory.

2. If the course is not yet part of the `catalog` field, then you must add it. Each course in the `catalog` field should have the following form:

```
{
    "id": "CSCI 104",
    "title": "Data Science and Computing for All",
    "icon": "images/courseicons/icon-cs104.png",
    "description": "Many of the world's greatest discoveries..."
}
```

If there is no icon (Iris made all the original icons), then just create some arbitrary square image, preferably a circular logo with a transparent background.

### Adding an event to the Colloquium page:

1. Put a square photo (any format, but typically JPG or PNG) of the speaker (or some other image representing the event) in the `deptpage/images/colloquium/` directory.

2. Add a new item to the `events` field of `deptpage/data/colloquium.json`. Here is an example:

```
{
    "date": "May 3, 2024",
    "speaker": "Melanie Subbiah",
    "affiliation": "Columbia University",
    "title": "How did we get here?: The Rise of Large Language Models and the Problem of Evaluation",
    "photo": "images/colloquium/subbiah.jpeg",
    "abstract": "Large Language Models (LLMs) have permeated almost every field..."
}
```

All fields are mandatory. The `date` field needs to be automatically parsed, so make sure there are no typos.  The path to the `photo` file is relative to the `deptpage` directory.

### Adding an article to the News page:

1. Create a Markdown file in the `deptpage/articles/` directory that contains the body of the article (see `deptpage/articles/purdue-data.md` for an example).

2. If the article has an associated photo, then put this photo in the `deptpage/images/misc/` directory.

3. Add a new item to the `articles` field of `deptpage/data/news.json`. Here is an example:

```
    {
        "id": "article-purdue-data",
        "date": "December 5, 2023",
        "title": "Williams CS Majors Place 3rd in Purdue Data 4 Good Competition",
        "photo": "images/misc/purdue-data.jpg",
        "article": "articles/purdue-data.md",
        "teaser": "Williams CS Majors get third place in a data science competition!"            
    }
```

The ids of all articles should be unique. The "teaser" is what shows up when this article is advertised on the main homepage. You can omit the teaser if you want to just use the title as the teaser. The photo can also be omitted. All other fields are mandatory. All paths are relative to the `deptpage` directory.





