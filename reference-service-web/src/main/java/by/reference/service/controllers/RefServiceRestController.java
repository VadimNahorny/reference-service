package by.reference.service.controllers;

import by.reference.service.dao.Department;
import by.reference.service.dao.Employee;
import by.reference.service.dao.Profession;
import by.reference.service.repository.DepartmentRepository;
import by.reference.service.repository.EmployeeRepository;
import by.reference.service.repository.ProfessionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("/refService")
public class RefServiceRestController {


    private final ProfessionRepository professionRepository;

    private final DepartmentRepository departmentRepository;

    private final EmployeeRepository employeeRepository;



    public RefServiceRestController(ProfessionRepository professionRepository, DepartmentRepository departmentRepository, EmployeeRepository employeeRepository) {
        this.professionRepository = professionRepository;
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
    }


    @GetMapping("/refService/professions")
    public ResponseEntity< List<Profession>> getProfessions() {
        return new ResponseEntity<>((List<Profession>) professionRepository.findAll(), HttpStatus.OK);
    }


    @PostMapping(path = "/refService/profession/save", consumes = "application/json")
    public ResponseEntity<?> saveProfession(@RequestBody Profession profession) {
        Profession save = professionRepository.save(profession);
        if (save != null) {
            return ResponseEntity.ok(save.getId());
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }


    @PostMapping(path = "/refService/profession/remove", consumes = "application/json")
    public ResponseEntity<?> deleteProfession(@RequestBody Profession profession) {
        professionRepository.delete(profession);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/refService/departments")
    public ResponseEntity< List<Department>> getDepartments() {
        List<Department> all = (List<Department>) departmentRepository.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }


    @PostMapping(path = "/refService/department/save", consumes = "application/json")
    public ResponseEntity<?> saveDepartment(@RequestBody Department department) {
        Department save = departmentRepository.save(department);
        if (save != null) {
            return ResponseEntity.ok(save.getId());
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }


    @PostMapping(path = "/refService/department/remove", consumes = "application/json")
    public ResponseEntity<?> deleteDepartment(@RequestBody  Department department) {
        departmentRepository.delete(department);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/refService/employees")
    public ResponseEntity< List<Employee>> getEmployees() {
        List<Employee> all = (List<Employee>) employeeRepository.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }


    @PostMapping(path = "/refService/employee/save", consumes = "application/json")
    public ResponseEntity<?> saveEmployee(@RequestBody Employee employee) {
        Employee save = employeeRepository.save(employee);
        if (save != null) {
            return ResponseEntity.ok(save.getId());
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }


    @PostMapping(path = "/refService/employee/remove", consumes = "application/json")
    public ResponseEntity<?> deleteEmployee(@RequestBody Employee employee) {
        employeeRepository.delete(employee);
        return ResponseEntity.ok().build();
    }



}
