package by.reference.service.dto;

import javax.persistence.*;

public class DepartmentDto {

    private Long id;

    private String name;

    private String note;

    private Long parentDepartment;

    public DepartmentDto(Long id, String name, String note) {
        this.id = id;
        this.name = name;
        this.note = note;
    }

    public DepartmentDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getId() {
        return id;
    }
}
