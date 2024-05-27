package by.reference.service.dao;

import javax.persistence.*;

@Entity
public class Profession {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private String note;

    public Profession(Long id, String name, String note) {
        this.id = id;
        this.name = name;
        this.note = note;
    }

    public Profession() {
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
