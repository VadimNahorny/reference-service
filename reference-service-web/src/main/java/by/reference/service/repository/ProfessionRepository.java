package by.reference.service.repository;


import by.reference.service.dao.Profession;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ProfessionRepository extends CrudRepository<Profession, Long> {

    Profession save(Profession entity);

    List<Profession> findAllBy();


}
