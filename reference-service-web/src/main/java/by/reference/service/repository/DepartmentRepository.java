package by.reference.service.repository;


import by.reference.service.dao.Department;
import by.reference.service.dao.Profession;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface DepartmentRepository extends CrudRepository<Department, Long> {

    Department save(Department entity);

    List<Department> findAllBy();


}
