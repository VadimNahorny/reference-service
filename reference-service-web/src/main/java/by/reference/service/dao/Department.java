package by.reference.service.dao;


import javax.persistence.*;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String note;

    @ManyToOne
    private Department parentDepartment;

    public Department(Long id, String name, String note, Department parentDepartment) {
        this.id = id;
        this.name = name;
        this.note = note;
        this.parentDepartment = parentDepartment;
    }

    public Department() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Department getParentDepartment() {
        return parentDepartment;
    }

    public void setParentDepartment(Department parentDepartment) {
        this.parentDepartment = parentDepartment;
    }
}
