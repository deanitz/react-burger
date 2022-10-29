import { Link } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import { ROUTE_ROOT } from "../utils/routes";

const NotFound = () => (
  <PageLayout>
    <h1 className="text text_type_main-large mt-10 mb-5">
      Страница не найдена!
    </h1>
    <Link
      to={ROUTE_ROOT}
      className="page-form_link text text_type_main-default"
    >
      Вернуться на главную страницу
    </Link>
  </PageLayout>
);

export default NotFound;
