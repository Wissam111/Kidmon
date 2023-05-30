export const categories = [
  {
    text: "Snack",
    categoryImg: require("../assets/icons/snack.png"),
  },

  {
    text: "Cold",
    categoryImg: require("../assets/icons/cold-coffee.png"),
  },
  {
    text: "Hot",
    categoryImg: require("../assets/icons/coffee-cup.png"),
  },
  {
    text: "Food",
    categoryImg: require("../assets/icons/fast-food.png"),
  },
];
export const categoriesOptions = [
  { value: "Snack", label: "Snack" },
  { value: "Cold", label: "Cold" },
  { value: "Hot", label: "Hot" },
  { value: "Food", label: "Food" },
];
export const categoriesOptionsV2 = [
  { value: "All", label: "All" },
  { value: "Snack", label: "Snack" },
  { value: "Cold", label: "Cold" },
  { value: "Hot", label: "Hot" },
  { value: "Food", label: "Food" },
];

export const allergicIngredients = [
  "Milk",
  "Eggs",
  "Mustard",
  "Peanuts",
  "Soy",
  "Fish",
];

export const tableMaincolumn = [
  { id: "img", numeric: true, disablePadding: false, label: "" },
  { id: "name", label: "Product Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "sold",
    label: "Sold",
    minWidth: 170,
    align: "right",
  },
  { id: "action", numeric: true, disablePadding: false, label: "Action" },
];

export const fileTypes = ["JPEG", "PNG", "JPG"];
export const pieChartOptions = {
  colors: ["#60B9E6", "#9BD65F", "#E55F8B", "#E5A35F", "#B7E5F3", "#cccccc"],
};
export const chartOptions = {
  legend: "none",
  colors: ["#5FD5E5"],
};
