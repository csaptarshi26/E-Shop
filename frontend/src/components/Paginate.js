import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  let navigate = useNavigate();

  const navigatePage = (x) => {
    let red = !isAdmin ? 
                keyword ? 
                `/search/${keyword}/page/${x + 1}` 
                : `/page/${x + 1}` 
              : `/admin/productlist/${x + 1}`;
    navigate(red);
  }

  return pages > 1 && (
    <Pagination>
      {[...Array(pages).keys()].map(x => (
        <Pagination.Item
          key={x + 1}
          onClick={() => navigatePage(x)}
          active={x + 1 === page}
        >
          {x + 1}
        </Pagination.Item>

      ))}
    </Pagination>
  )
}
