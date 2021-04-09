import { useEffect, useState, useReducer } from "react";

const URL = process.env.BE;

import {
  useProducts,
  useProductDetail,
  useCity,
  useProvince,
} from "./custom-swr";
export { useProducts, useProductDetail, useCity, useProvince };

/**
 * "https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go"
 */

export function useLocalState(key, defaultValue) {
  const [state, setState] = useState(() => key || defaultValue);

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem(key)));
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export function useUser() {
  const [user, dispatchUser] = useReducer(userReducer, null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    dispatchUser({ type: "init", data });
  }, []);

  return [user];
}

function userReducer(state, action) {
  const { type, data, record } = action;
  switch (type) {
    case "init":
      return {
        data,
        URL,
      };

    default:
      return state;
  }
}

export function useWindowDimensions() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    sectionWidth: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          sectionWidth: 1040,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function useCategory() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [categories, setCategories] = useState([
    {
      value: 0,
      href: "category/all",
      image: "/images/home/cat/all.png",
      name: "all",
    },
    {
      value: 1,
      href: "category/food",
      image: "/images/home/cat/food.png",
      name: "food",
    },
    {
      value: 2,
      href: "category/fashion",
      image: "/images/home/cat/fashion.png",
      name: "fashion",
    },
    {
      value: 3,
      href: "category/accessories",
      image: "/images/home/cat/accessories.png",
      name: "accessories",
    },
    {
      value: 4,
      href: "category/textile",
      image: "/images/home/cat/textile.png",
      name: "textile",
    },
    {
      value: 5,
      href: "category/art",
      image: "/images/home/cat/art.png",
      name: "art",
    },
    {
      value: 6,
      href: "category/souvenir",
      image: "/images/home/cat/souvenir.png",
      name: "souvenir",
    },
    {
      value: 7,
      href: "category/beauty",
      image: "/images/home/cat/beauty.png",
      name: "beauty",
    },
  ]);

  return categories;
}

export function useDestination() {
  const [categories, setCategories] = useState([
    {
      value: 0,
      href: "/destination/jakarta",
      image: "/images/slider/jakarta.jpeg",
      name: "jakarta",
    },
    {
      value: 1,
      href: "/destination/yogyakarta",
      image: "/images/slider/jogjakarta.jpg",
      name: "yogyakarta",
    },
    {
      value: 2,
      href: "/destination/bali",
      image: "/images/slider/bali.jpeg",
      name: "bali",
    },
    {
      value: 3,
      href: "/destination/lombok",
      image: "/images/slider/lombok.jpeg",
      name: "lombok",
    },
    {
      value: 4,
      href: "/destination/malang",
      image: "/images/slider/malang.jpeg",
      name: "malang",
    },
    {
      value: 5,
      href: "/destination/palembang",
      image: "/images/slider/palembang.jpeg",
      name: "palembang",
    },
    {
      value: 6,
      href: "/destination/semarang",
      image: "/images/slider/semarang.jpeg",
      name: "semarang",
    },
  ]);

  return categories;
}

export function useHeaderCarousel(category) {
  switch (category) {
    case "beauty":
      return [
        "/images/category/headers/beauty-1.jpeg",
        "/images/category/headers/beauty-2.jpeg",
        "/images/category/headers/beauty-3.jpeg",
      ];
    case "accessories":
      return [
        "/images/category/headers/accessories-1.jpg",
        "/images/category/headers/accessories-2.jpg",
        "/images/category/headers/accessories-3.jpg",
      ];
    case "food":
      return [
        "/images/category/headers/food-1.jpg",
        "/images/category/headers/food-2.jpg",
        "/images/category/headers/food-3.jpg",
      ];
    case "art":
      return [
        "/images/category/headers/art-1.jpg",
        "/images/category/headers/art-2.jpg",
        "/images/category/headers/art-3.jpg",
      ];
    case "fashion":
      return [
        "/images/category/headers/fashion-1.jpg",
        "/images/category/headers/fashion-2.jpg",
        "/images/category/headers/fashion-3.jpg",
      ];
    case "souvenir":
      return [
        "/images/category/headers/souvenir-1.jpg",
        "/images/category/headers/souvenir-2.jpg",
        "/images/category/headers/souvenir-3.jpg",
      ];
    case "textile":
      return [
        "/images/category/headers/textile-1.jpg",
        "/images/category/headers/textile-2.jpg",
        "/images/category/headers/textile-3.jpg",
      ];
    case "jakarta":
      return [
        "/images/destination/headers/jakarta-1.jpg",
        "/images/destination/headers/jakarta-2.jpg",
        "/images/destination/headers/jakarta-3.jpg",
      ];
    case "lombok":
      return [
        "/images/destination/headers/lombok-1.jpg",
        "/images/destination/headers/lombok-2.jpg",
        "/images/destination/headers/lombok-3.jpg",
      ];
    case "malang":
      return [
        "/images/destination/headers/malang-1.jpg",
        "/images/destination/headers/malang-2.jpg",
        "/images/destination/headers/malang-3.jpg",
      ];
    case "palembang":
      return [
        "/images/destination/headers/palembang-1.jpg",
        "/images/destination/headers/palembang-2.jpg",
        "/images/destination/headers/palembang-3.jpg",
      ];
    case "semarang":
      return [
        "/images/destination/headers/semarang-1.jpg",
        "/images/destination/headers/semarang-2.jpg",
        "/images/destination/headers/semarang-3.jpg",
      ];
    case "yogyakarta":
      return [
        "/images/destination/headers/yogyakarta-1.jpg",
        "/images/destination/headers/yogyakarta-2.jpg",
        "/images/destination/headers/yogyakarta-3.jpg",
      ];
    case "bali":
      return [
        "/images/destination/headers/bali-1.jpg",
        "/images/destination/headers/bali-2.jpg",
        "/images/destination/headers/bali-3.jpg",
      ];
    default:
      window.location.replace("/");
      break;
  }
}
