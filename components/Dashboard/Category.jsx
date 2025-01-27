import React, { useState } from "react";
import style from "./Category.module.css";
import Music from "../../components/music/music";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorisedMusic,
  resetCategorisedMusic,
} from "../../actions/musicActions";
import ReactPaginate from "react-paginate";
import styles from "../../styles/AllMusic.module.css";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const selected_category = [];
  const [category_search, setCategory_search] = useState(0);
  const [selected, setSelected] = useState([])

  const dispatch = useDispatch();
  const categorised_music = useSelector(
    (state) => state.music.categorised_music
  );
  const totalPages = useSelector((state) => state.music.totalPages);

  const handleChange = (e) => {
    dispatch(getCategorisedMusic(selected, e.selected + 1));
  };

  async function getCategories() {
    setCategory_search(1);
    setSelected(selected_category)
    
    dispatch(getCategorisedMusic(selected_category));
  }

  const clear_category = () => {
    setCategory_search(0);
    dispatch(resetCategorisedMusic());
  };

  // function called on clicking category card 
  function handleClick(e, category) {
    if (process.browser) {
      if (selected_category.indexOf(category.toLowerCase()) !== -1) {
        selected_category.splice(
          selected_category.indexOf(category.toLowerCase()),
          1
        );
      } else {
        selected_category.push(category.toLowerCase());
      }

      const param = document.getElementById(e);
      const classes = param.classList;

      if (classes.length === 1) {
        param.classList.add('Category_selected__k-mej');
      } else {
        param.classList.remove('Category_selected__k-mej');
      }

    }
  }

  // a list of all available categories 
  const categoryList = [
    {
      category: "Hip-Hop",
      imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F9to5mac.com%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fapple-music-rap-life.jpeg%3Fresize%3D1024%2C576&f=1&nofb=1"
    },
    {
      category: "Bass",
      imageURL: "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      category: "Chill",
      imageURL: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      category: "Beats",
      imageURL: "https://www.icmp.ac.uk/sites/default/files/styles/page_background/public/music-production-studio-process-explained-mixing-mastering-songwriting-editing-promoting.jpg?itok=eC1jlQ1J"
    },
    {
      category: "Musical",
      imageURL: "https://www.incimages.com/uploaded_files/image/1920x1080/getty_491119158_283701.jpg"
    },
    {
      category: "Slow",
      imageURL: "https://cdn.shopify.com/s/files/1/1728/2157/articles/37.jpg?v=1552935505"
    },
    {
      category: "EDM",
      imageURL: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpodcasts.nickware.ru%2Fedm%2Flogo.jpeg&f=1&nofb=1"
    },
    {
      category: "Electric",
      imageURL: "https://images.pexels.com/photos/144428/pexels-photo-144428.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      category: "vocal",
      imageURL: "https://www.theeapts.com/blog/wp-content/uploads/sites/3997/2019/10/wpid-microphone2.jpg"
    },
    {
      category: "House",
      imageURL: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
  ];

  return (
    <>
      {category_search === 1 ? (
        <div id="container">
          <h1>Top Searches</h1>

          {categorised_music ? (
            categorised_music &&
            categorised_music?.map((i) => <Music music={i} />)
          ) : (
            <Loader />
          )}
          {totalPages && (
            <div className={styles.pagination_container}>
              <ReactPaginate
                containerClassName={
                  styles.pagination
                } /* as this work same as bootstrap class */
                subContainerClassName={[styles.pages, styles.pagination].join(
                  " "
                )} /* as this work same as bootstrap class */
                activeClassName={styles.active}
                pageCount={totalPages}
                breakLabel={false}
                marginPagesDisplayed={0}
                pageRangeDisplayed={0}
                previousLabel={"<"}
                nextLabel={">"}
                onPageChange={(e) => handleChange( e)}
              />
            </div>
          )}
          <button className={style.clear_btn} onClick={() => clear_category()}>
            Clear Category
          </button>
        </div>
      ) : (
          <>
      <h1>Select Categories</h1>
        <div className={style.category}>
          <div className={style.container}>
            {/* return categorycard components for each category */}
            <div className={style.row}>
              {categoryList.map( ( categoryObj, index )=> 
                <CategoryCard
                  id={index}
                  musicCategory={categoryObj.category}
                  imageURL={categoryObj.imageURL}
                  handleClick={handleClick}
                />
              )}
            </div>
          </div>
          <div className={style.search_btn}>
            <button onClick={() => {
              console.log(getCategories());
              getCategories()
            }}>Search</button>
          </div>
        </div>
      </>
      )}
    </>
  );
};

export default Category;
