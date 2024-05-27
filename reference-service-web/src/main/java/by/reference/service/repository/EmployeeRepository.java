package by.reference.service.repository;


import by.reference.service.dao.Department;
import by.reference.service.dao.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    Employee save(Employee entity);

    List<Employee> findAllBy();


}
