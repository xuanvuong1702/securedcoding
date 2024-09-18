import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import OverviewTab from "../components/body/SearchResult/MainResults/OverviewTab";
import ListOfCases from "../components/body/SearchResult/MainResults/ListOfCasesTab";
export const URI = {
    RESULT_DETAILS: "/result-details",
    NOT_PERMIT: "/403",
    NOT_FOUND: "/404",
    NOTH_AUTH: "/401",
};

export const QUERY_KEY = {
    RESULT_DETAILS: "RESULT_DETAILS",
    HISTORY_RESULTS: "HISTORY_RESULTS"
};

export const FORMAT_DATE = "DD.MM.YYYY";

export const STATUS_API = {
    LOADING: "loading",
    SUCCESS: "success",
};

export const displayOptions = [
    { value: "hideAll", label: "Hide All" },
    { value: "showAll", label: "Show All" },
];

export const sortingOptions = [
    { value: "alphabetical", label: "Alphabetical Order" },
    { value: "numerical", label: "Numerical Order" },
    { value: "dateAsc", label: "Date (Ascending)" },
    { value: "dateDesc", label: "Date (Descending)" },
    { value: "popularity", label: "Popularity" },
    { value: "priceLow", label: "Price (Low to High)" },
    { value: "priceHigh", label: "Price (High to Low)" },
    { value: "ratingHigh", label: "Rating (Highest to Lowest)" },
    { value: "distance", label: "Distance (Nearest to Farthest)" },
    { value: "relevance", label: "Relevance" },
];

export const fakeDataListOfCases = [
    {
        id: 0,
        title: "Lim Jun Kai (Lin Jun Kai) v Orientus Contry Clubs & Resort Pte Ltd DC Suit No 1010 of 2011",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 1,
        title: "Muhammad Rahmatullah Bin Sudarman v ITW Contruction Products (Singapore) Pte Ltd and another DC Suit No 1664 of 2017",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 2,
        title: "Panchatcharam Gunaseelan v Lee Zhi Li, Alan DC Suit No 1934 of 2018",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 3,
        title: "John Doe v ABC Corporation DC Suit No 1234 of 2022",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 4,
        title: "Jane Smith v XYZ Corporation DC Suit No 5678 of 2023",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 5,
        title: "Michael Brown v QRS Corporation DC Suit No 9876 of 2024",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 6,
        title: "Emily Johnson v UVW Corporation DC Suit No 3456 of 2025",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 7,
        title: "David Lee v XYZ Corporation DC Suit No 6789 of 2026",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 8,
        title: "Sarah Wilson v UVW Corporation DC Suit No 2345 of 2027",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
    {
        id: 9,
        title: "Matthew Davis v QRS Corporation DC Suit No 7890 of 2028",
        options: [
            {
                label: "Awards Summary",
                text: "Lorem ipsum dolor sit amet, consectetur adip",
            },
            {
                label: "Keywords Summary",
                text: "Lorem ipsum dolor sit amet, consectet mutated",
            },
        ],
    },
];

export const dataTab = [
    {
        id: 0,
        icon: CorporateFareIcon,
        name: "Overview",
        children: OverviewTab,
    },
    {
        id: 1,
        icon: FormatListBulletedIcon,
        name: "List of Cases",
        children: ListOfCases,
    },
];

export const fakeDatascatterOverviewTab = [
    [0, 1],
    [1, 3],
    [2, 4],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 6],
    [8, 7],
    [9, 7],
    [10, 8],
    [11, 8],
];

export const fakeDatabarOverviewTab = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const fakeDatayAxisOverviewTab = [
    2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022,
];

export const fakeDataTimeLineHorizontal = [
    {
        title: "$1,000.00",
        status: "process",
        description: "10th Percentitle",
    },
    {
        title: "$2,000.00",
        status: "process",
        description: "Lower Quartile",
    },
    {
        title: "$4,000.00",
        status: "process",
        description: "Median",
    },
    {
        title: "$10,000.00",
        status: "process",
        description: "Upper Quartile",
    },
    {
        title: "$30,000.00",
        status: "process",
        description: "90th Percentile",
    },
];
