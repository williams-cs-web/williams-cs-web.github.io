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

The `id` is just the person's name. The `role` should be `faculty`, `staff`, or `emeriti`. You can omit the `webpage` field or `interests` field if not applicable. All other fields are mandatory. All paths are relative to the `deptpage` directory.


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

If there is no icon (Iris made all the original icons), then just create some arbitrary square image, preferably a circular logo with a transparent background, then add it to the `deptpage/images/courseicons` directory.

### Adding an event to the Colloquium page:

1. Put a **square** photo (any format, but typically JPG or PNG) of the speaker (or some other image representing the event) in the `deptpage/images/colloquium/` directory.

2. Add a new item to the `events` field of `deptpage/data/colloquium.json`. Here is an example:

```
{
    "date": "May 3, 2024",
    "speaker": "Melanie Subbiah",
    "affiliation": "Columbia University",
    "title": "How did we get here? The Rise of Large Language Models and the Problem of Evaluation",
    "location": "Bronfman Auditorium",
    "time": "1pm",
    "photo": "images/colloquium/subbiah.jpeg",
    "abstract": "Large Language Models (LLMs) have permeated almost every field..."
}
```

The `location` and `time` fields are optional (if not provided, the default values are `TCL 123` and `2:35pm`). All other fields are mandatory. The `date` field needs to be automatically parsed, so make sure there are no typos.  The path to the `photo` file is relative to the `deptpage` directory.

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

The `id`s of all articles should be unique. The `teaser` is what shows up when this article is advertised on the main homepage. You can omit the `teaser` if you want to just use the `title` as the `teaser`. The `photo` can also be omitted. All other fields are mandatory. All paths are relative to the `deptpage` directory.


### Modifying information on the Student Life page:

1. To update the board members of the various student organizations, first add a **square** photo of the board member to the `deptpage/images/students` directory. Then add a new item to the `leadership` field of the relevant group in `deptpage/data/students.json`. Here is an example:

```
{
    "name": "Ye Shu",
    "year": "2024",
    "photo": "images/students/shu.jpeg"
}
```

The path to the photo is relative to the `deptpage` directory.

2. Other information can also be changed by modifying `deptpage/data/students.json`, like the webpage or description of a student group.


### Adding information to the Research Opportunities page:

1. Create a Markdown file in the `deptpage/articles/` directory that contains the main text of the research opportunity (see `deptpage/articles/ssr.md` for an example).

2. If the research opportunity has an associated photo, then put this photo in the `deptpage/images/misc/` directory.

3. Add a new item to the `opportunities` field of `deptpage/data/research.json`. Here is an example:

```
    {
        "id": "opportunity-ssr",
        "name": "Summer Science Research",
        "photo": "images/misc/kayaking.jpg",
        "article": "articles/ssr.md"
    }
```

The `id`s of all research opportunities should be unique. The `photo` can be omitted. All other fields are mandatory. All paths are relative to the `deptpage` directory.

### Adding pre-approved study away courses to the Plan Your Major page:

1. Add a new item to the `equivalents` field of `deptpage/data/studyaway.json`. Here is an example:

```
{
    "program": "AIT Budapest",
    "course": "Algorithms and Data Structures",
    "cs_equiv": "256",
    "math_equiv": 0
}
```

All fields are mandatory. The `cs_equiv` field should have one of the following values: 

* `"no"` (if the course does not satisfy any CSCI major requirement) 
* `"3xx"` (if the course counts as a CSCI elective but there is no exact correspondent at Williams)
* the Williams CSCI course number (e.g. `"256"` in the above example) that corresponds to the study away course.

The `math_equiv` should be either `1` (if the course satisfies the Math elective requirement of the CS major) or `0` (if not).

### Modifying the Major Planning Assistant on the Plan Your Major page:

1. Each major requirement is specified using the following format under the `requirements` field in `deptpage/data/major.json`:

```
{
    "id": "CSCI 3xx(1)",
    "title": "Computer Science Elective 1",
    "info": "A course chosen from 300- or 400-level courses in Computer Science.",
    "prereqs": [
        "CSCI 136"
    ],
    "error": "All electives have 136 as a prerequisite.",
    "recommended": [
        "CSCI 237",
        "CSCI 256"
    ],
    "warning": "Most electives have either 237 or 256 as a prerequisite."   
}
```

* The `id` field should be a unique identifier for the major requirement and the `title` field is a human-friendly summary of the requirement. Both fields are mandatory.

* The `info` field is a description of the major requirement that will be displayed to the student if they click on that requirement. This field is mandatory.

* The `prereqs` field is a list of the `id`s of the prerequisites. They must exactly match (including case) the `id` field of the prerequisite requirement. The list is treated as a conjunction, i.e. the student must have taken **all** the courses prior to enrolling in the major requirement. If not, then the text in `error` field will be displayed to the student. Both the `prereqs` and `error` fields are optional.

* The `recommended` field is a list of the `id`s of recommended previous courses. It is treated as a disjunction, i.e. the student is recommended to have taken **at least one** of these courses prior to enrolling in the major requirement. If not, then the text in `warning` field will be displayed to the student. Both the `recommended` and `warning` fields are optional.

2. Each of the example paths through the major is specified using the following format under the `paths` field in `deptpage/data/major.json`:

```
{
    "id": "day one",
    "icon": "🏫",
    "description": "you arrive at williams with an interest in becoming a CS major",
    "path": [
        {
            "semester": "1a",
            "courses": [
                "CSCI 134"
            ]
        },
        {
            "semester": "1b",
            "courses": [
                "CSCI 136",
                "MATH 200"
            ]
        },
        {
            "semester": "2a",
            "courses": [
                "CSCI 237",
                "MATH 2xx"
            ]
        },
        {
            "semester": "2b",
            "courses": [
                "CSCI 256"
            ]
        },
        {
            "semester": "3a",
            "courses": [
                "CSCI 334/361"
            ]
        },
        {
            "semester": "3b",
            "courses": [
                "CSCI 3xx(1)"
            ]
        },
        {
            "semester": "4a",
            "courses": [
                "CSCI 3xx(2)"
            ]
        },
        {
            "semester": "4b",
            "courses": [
                "CSCI 3xx(3)"
            ]
        }
    ]
}
```

* The `id` field should be a human-friendly name for the major path.
* The `icon` field should be a single emoji that visually represents the major path.
* The `description` field should be a short description of the major path.
* The `path` field is a list of 8 semesters and the major requirements taken during each of them. The requirements should be specified using the value of the requirement's `id` field.

All fields are mandatory.

