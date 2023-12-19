import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./Pagination.scss";

const Pagination = observer(() => {
  const { project } = useContext(Context);
  const pageCount = Math.ceil(project.totalCount / project.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const maxVisiblePages = 5;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

  const renderPages = () => {
    if (pageCount <= maxVisiblePages) {
      return pages;
    }

    const firstPage = Math.max(1, project.page - halfMaxVisiblePages);
    const lastPage = Math.min(pageCount, firstPage + maxVisiblePages - 1);

    return pages.slice(firstPage - 1, lastPage);
  };

  return (
    <section className="pagination">
      <div className="pagination__container container">
        <ul className="pagination__list list-reset">
          {project.page > 1 && (
            <li
              onClick={() => project.setPage(project.page - 1)}
              className="pagination__item pagination__item-btn"
            >
              <FaAngleLeft className="pagination__item-icon" />
            </li>
          )}

          {renderPages().map((page) => (
            <li
              key={page}
              className={`pagination__item ${
                project.page === page ? "pagination__item--active" : ""
              }`}
              onClick={() => {
                project.setPage(page);
              }}
            >
              {page}
            </li>
          ))}

          {project.page < pageCount && (
            <li
              onClick={() => project.setPage(project.page + 1)}
              className="pagination__item pagination__item-btn"
            >
              <FaAngleRight className="pagination__item-icon" />
            </li>
          )}
        </ul>
      </div>
    </section>
  );
});

export default Pagination;
