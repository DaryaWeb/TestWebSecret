
import "./main.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [Data, setData] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [canon, setCanon] = useState(false);
  const [nikon, setNikon] = useState(false);

  let brandCheck = ""
  const HandleChangeBrand = (e, type) =>{
    if (type === "canon") {
      setCanon(e)
        if (!canon) {
          brandCheck = "brands[]=1";
        } else {
          brandCheck = "";
        }
    }
    if (type === "nikon") {
      setNikon(e)
       if (!nikon) {
         brandCheck = "brands[]=9";
       } else {
         brandCheck = "";
       }
    }

    axios
      .get(
        "https://getlens-master.stage.dev.family/api/pages/obektivy?" +
          brandCheck +
          "&price[min]=" +
          minPrice +
          "&price[max]=" +
          maxPrice,
        {
          auth: {
            username: "admin",
            password: "Wj3g4W",
          },
        }
      )
      .then((res) => {
        setData(res.data);
      });
  }

  const HandleChangePrice = (e, type) =>{
    if (type === "max") {
      setMaxPrice(e)
    }
    if (type === "min") {
      setMinPrice(e)
    }

    axios
      .get(
        "https://getlens-master.stage.dev.family/api/pages/obektivy?" +
          brandCheck +
          "&price[min]=" +
          minPrice +
          "&price[max]=" +
          maxPrice,
        {
          auth: {
            username: "admin",
            password: "Wj3g4W",
          },
        }
      )
      .then((res) => {
        setData(res.data);
      });

  }


  useEffect(() => {
    axios
      .get(
        "https://getlens-master.stage.dev.family/api/pages/obektivy?" +
          brandCheck +
          "&price[min]=" +
          minPrice +
          "&price[max]=" +
          maxPrice,
        {
          auth: {
            username: "admin",
            password: "Wj3g4W",
          },
        }
      )
      .then((res) => {
        setData(res.data);
      });
  }, [setData]);

  return (
    <section>
      <div class="container">
        <div class="row ">
          <div class="columns-5 ">
            <div class="sidebar ">
              <div class="column-2">
                <div class="sidebar-title">
                  <p>Товаров 143</p>
                  <h3>Камеры</h3>
                </div>
                <div class=" price-filter">
                  <h4 id="price">Цена, ₽</h4>
                  <div class="form">
                    <input
                      class="control"
                      id="minamount"
                      type="text"
                      value={minPrice}
                      onChange={(e) => HandleChangePrice(e.target.value, "min")}
                    />
                    <input
                      class="control"
                      id="maxaount"
                      type="text"
                      value={maxPrice}
                      onChange={(e) => HandleChangePrice(e.target.value, "max")}
                    />
                  </div>
                </div>
                <div class="sidebar-checkbox">
                  <h4 id="brands">Бренд</h4>

                  <input
                    id="canon"
                    name="cb"
                    type="checkbox"
                    checked={canon}
                    onChange={(e) =>
                      HandleChangeBrand(e.target.checked, "canon")
                    }
                  />

                  <label class="label" for="canon">
                    Canon
                  </label>
                  <input
                    id="nikon"
                    name="cb"
                    type="checkbox"
                    checked={nikon}
                    onChange={(e) =>
                      HandleChangeBrand(e.target.checked, "nikon")
                    }
                  />
                  <label class="label" for="nikon">
                    Nikon
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="columns-9 ">
            <div class="content">
              <div class="row ">
                {Data.products?.map((e) => {
                  return (
                    <div class="columns-4">
                      <div class="section-inner">
                        <div
                          class="section-inner-image"
                          style={{
                            backgroundImage: "url(" + e.image.desktop.x1 + ")",
                          }}
                        >
                          {e.is_new ? (
                            <div class="new-prod">Новинка</div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div class="section-inner-params">
                          <h5>{e.title}</h5>
                          <div class="price-wrapper">
                            <span>{e.price} ₽</span>
                          </div>
                          <div class="to-card-wrapper">
                            <a href="#" class="to-card">
                              В корзину
                            </a>
                            <a href="#" class="to-card-like">
                              <svg
                                width="21"
                                height="18"
                                viewBox="0 0 21 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0829 17.2237L10.1169 17.187L10.0829 17.2237C10.1311 17.2683 10.1944 17.2932 10.2602 17.2932C10.3259 17.2932 10.3892 17.2683 10.4374 17.2237L10.4034 17.187L10.4374 17.2237L18.2626 9.97269L18.2286 9.93602L18.2626 9.97269C18.8222 9.45398 19.2708 8.82715 19.5813 8.13007C19.8917 7.43299 20.0574 6.68014 20.0685 5.91715C20.0796 5.15416 19.9358 4.39687 19.6458 3.69107C19.3558 2.98526 18.9256 2.34562 18.3812 1.81086C17.8369 1.2761 17.1897 0.857326 16.4789 0.579886C15.768 0.302446 15.0083 0.172145 14.2456 0.196783C13.483 0.221421 12.7332 0.400505 12.0418 0.723246C11.7319 0.867861 11.4367 1.03997 11.1594 1.23707C10.8329 1.46916 10.5313 1.7359 10.2601 2.03319C9.98896 1.73587 9.68741 1.4691 9.36096 1.23698C9.08364 1.03978 8.78834 0.867582 8.47844 0.722891C7.78695 0.400038 7.03714 0.220815 6.2744 0.196118C5.51165 0.171422 4.75182 0.301777 4.0409 0.579221C3.32998 0.856664 2.68273 1.27543 2.13834 1.81025C1.59395 2.34507 1.16373 2.98477 0.87372 3.69066C0.583707 4.39655 0.439931 5.15399 0.451092 5.91705C0.462253 6.68011 0.628119 7.43297 0.938653 8.13007C1.24919 8.82718 1.69793 9.45403 2.25773 9.97269L10.0829 17.2237ZM3.41327 8.7258L3.41319 8.72573L3.41313 8.72567C3.02201 8.3633 2.7085 7.92535 2.49155 7.43832C2.27459 6.95128 2.15871 6.4253 2.15091 5.89219C2.14311 5.35906 2.24357 4.82986 2.44618 4.3367C2.6488 3.84353 2.94937 3.3966 3.32971 3.02295C3.71002 2.64933 4.16221 2.35675 4.65894 2.16289C5.15568 1.96904 5.68654 1.87798 6.21938 1.89523C6.75224 1.91248 7.2761 2.03769 7.75924 2.26327C8.24234 2.48882 8.67467 2.81007 9.03005 3.20755L10.2226 4.54143L10.2599 4.58311L10.2972 4.54143L11.49 3.20774C11.8454 2.81034 12.2777 2.48918 12.7608 2.26371C13.2438 2.03824 13.7676 1.91311 14.3005 1.8959C14.8334 1.87868 15.3642 1.96973 15.8608 2.16354C16.3574 2.35737 16.8096 2.64995 17.1899 3.02357C17.5702 3.39718 17.8707 3.84406 18.0734 4.33718C18.276 4.8303 18.3765 5.35938 18.3687 5.89244C18.361 6.42552 18.2451 6.95151 18.0283 7.43851C17.8114 7.92546 17.4981 8.36335 17.1071 8.72573L17.107 8.72586L17.1069 8.72593L17.1068 8.72606L10.2602 15.0703L3.41333 8.72586L3.41327 8.7258Z"
                                  fill="#1B1B1B"
                                  stroke="black"
                                  stroke-width="0.1"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
